import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getAdminAuthService } from "../../../middleware/admin_auth/AdminAuthService.js";
import { AdminAuthMiddleware } from "../../../middleware/admin_auth/AdminAuthMiddleware.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

const prisma = new PrismaClient();

export class AdminAuthController {
  constructor() {
    this.adminAuthService = getAdminAuthService();
    this.adminAuthMiddleware = new AdminAuthMiddleware();
  }
  

  createExpressController() {
    const router = express.Router();

    // Admin Login - Completely separate from user login
    router.post("/admin/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Email and password are required",
            isAdminAuth: true
          });
        }

        // Find admin user
        const adminUser = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
            role: "admin"
          }
        });

        if (!adminUser) {
          return res.status(401).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Invalid admin credentials",
            isAdminAuth: true
          });
        }

        // Find user credentials
        const userCredential = await prisma.user_credential.findUnique({
          where: {
            user_email: email.toLowerCase()
          }
        });

        if (!userCredential) {
          return res.status(401).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Invalid admin credentials",
            isAdminAuth: true
          });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          password,
          userCredential.password_hash
        );

        if (!isPasswordValid) {
          return res.status(401).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Invalid admin credentials",
            isAdminAuth: true
          });
        }

        // Generate admin-specific tokens
        const adminTokens = this.adminAuthService.generateAdminToken(
          adminUser.id,
          adminUser.email
        );

        if (!adminTokens) {
          return res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Failed to generate admin authentication tokens",
            isAdminAuth: true
          });
        }

        // Log admin login
        console.log(`Admin login successful: ${adminUser.email} at ${new Date().toISOString()}`);

        // Return admin user data with tokens
        res.status(200).json({
          status: CommonConstants.SUCCESS_STATUS,
          message: "Admin login successful",
          data: {
            admin: {
              id: adminUser.id,
              email: adminUser.email,
              firstName: adminUser.first_name,
              lastName: adminUser.last_name,
              role: adminUser.role
            },
            auth: adminTokens
          },
          isAdminAuth: true
        });

      } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
          status: CommonConstants.FAILURE_STATUS,
          message: "Admin login failed",
          isAdminAuth: true
        });
      }
    });

    // Admin Token Refresh
    router.post("/admin/auth/refresh", 
      this.adminAuthMiddleware.refreshAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const newTokens = req.newAdminTokens;

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Admin token refreshed successfully",
            data: {
              auth: newTokens
            },
            isAdminAuth: true
          });
        } catch (error) {
          console.error("Admin token refresh error:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Failed to refresh admin token",
            isAdminAuth: true
          });
        }
      }
    );

    // Admin Logout
    router.post("/admin/auth/logout",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const admin = req.admin;

          // Clear admin session
          this.adminAuthMiddleware.clearAdminSession(admin.id, admin.tokenId);

          console.log(`Admin logout: ${admin.email} at ${new Date().toISOString()}`);

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Admin logged out successfully",
            isAdminAuth: true
          });
        } catch (error) {
          console.error("Admin logout error:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Admin logout failed",
            isAdminAuth: true
          });
        }
      }
    );

    // Verify Admin Token (for frontend to check if admin is authenticated)
    router.get("/admin/auth/verify",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const admin = req.admin;

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Admin token is valid",
            data: {
              admin: {
                id: admin.id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName,
                role: admin.role
              }
            },
            isAdminAuth: true
          });
        } catch (error) {
          console.error("Admin verification error:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Admin verification failed",
            isAdminAuth: true
          });
        }
      }
    );

    // Get Active Admin Sessions (Super admin only)
    router.get("/admin/auth/sessions",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const admin = req.admin;
          
          // You might want to add additional super-admin check here
          const sessions = this.adminAuthMiddleware.getActiveAdminSessions();

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Active admin sessions retrieved",
            data: {
              sessions: sessions,
              totalActive: sessions.length
            },
            isAdminAuth: true
          });
        } catch (error) {
          console.error("Error fetching admin sessions:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Failed to retrieve admin sessions",
            isAdminAuth: true
          });
        }
      }
    );

    // Force logout all admin sessions
    router.post("/admin/auth/logout-all",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const admin = req.admin;
          
          // Clear all sessions for this admin
          this.adminAuthMiddleware.clearAllAdminSessions(admin.id);

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "All admin sessions cleared",
            isAdminAuth: true
          });
        } catch (error) {
          console.error("Error clearing admin sessions:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Failed to clear admin sessions",
            isAdminAuth: true
          });
        }
      }
    );

    return router;
  }
}

