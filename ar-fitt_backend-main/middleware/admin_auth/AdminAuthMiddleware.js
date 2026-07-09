import { getAdminAuthService } from "./AdminAuthService.js";
import { CommonConstants } from "../../infra/utils/common/Constants.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminAuthMiddleware {
  constructor() {
    this.adminAuthService = getAdminAuthService();
    this.adminSessions = new Map(); // In-memory admin session store
  }

  // Middleware to verify admin token
  async verifyAdminToken(req, res, next) {
    try {
      // Get token from admin-specific header
      const adminToken = req.headers['x-admin-auth-token'] || req.headers['admin-authorization'];
      
      if (!adminToken) {
        return res.status(401).json({
          status: CommonConstants.FAILURE_STATUS,
          message: "Admin authentication required",
          isAdminAuth: true
        });
      }

      // Remove 'Bearer ' prefix if present
      const token = adminToken.replace('Bearer ', '');
      
      // Verify admin token
      const verification = this.adminAuthService.verifyAdminAccessToken(token);
      
      if (!verification.valid) {
        return res.status(401).json({
          status: CommonConstants.FAILURE_STATUS,
          message: "Invalid or expired admin token",
          error: verification.error,
          isAdminAuth: true
        });
      }

      // Fetch admin user from database
      const adminUser = await prisma.user.findFirst({
        where: {
          id: verification.adminId,
          role: "admin"
        }
      });

      if (!adminUser) {
        return res.status(403).json({
          status: CommonConstants.FAILURE_STATUS,
          message: "Admin account not found or insufficient privileges",
          isAdminAuth: true
        });
      }

      // Attach admin info to request
      req.admin = {
        id: adminUser.id,
        email: adminUser.email,
        firstName: adminUser.first_name,
        lastName: adminUser.last_name,
        role: adminUser.role,
        tokenId: verification.tokenId
      };

      // Check if this admin session is active
      const sessionKey = `${adminUser.id}_${verification.tokenId}`;
      if (!this.adminSessions.has(sessionKey)) {
        // Create new session
        this.adminSessions.set(sessionKey, {
          adminId: adminUser.id,
          loginTime: new Date(),
          lastActivity: new Date()
        });
      } else {
        // Update last activity
        const session = this.adminSessions.get(sessionKey);
        session.lastActivity = new Date();
        this.adminSessions.set(sessionKey, session);
      }

      next();
    } catch (error) {
      console.error("Admin authentication error:", error);
      return res.status(500).json({
        status: CommonConstants.FAILURE_STATUS,
        message: "Admin authentication failed",
        isAdminAuth: true
      });
    }
  }

  // Middleware to refresh admin token
  async refreshAdminToken(req, res, next) {
    try {
      const refreshToken = req.headers['x-admin-refresh-token'];
      
      if (!refreshToken) {
        return res.status(401).json({
          status: CommonConstants.FAILURE_STATUS,
          message: "Admin refresh token required",
          isAdminAuth: true
        });
      }

      const newTokens = this.adminAuthService.refreshAdminToken(refreshToken);
      
      if (!newTokens) {
        return res.status(401).json({
          status: CommonConstants.FAILURE_STATUS,
          message: "Invalid admin refresh token",
          isAdminAuth: true
        });
      }

      req.newAdminTokens = newTokens;
      next();
    } catch (error) {
      console.error("Admin token refresh error:", error);
      return res.status(500).json({
        status: CommonConstants.FAILURE_STATUS,
        message: "Admin token refresh failed",
        isAdminAuth: true
      });
    }
  }

  // Clear admin session
  clearAdminSession(adminId, tokenId) {
    const sessionKey = `${adminId}_${tokenId}`;
    this.adminSessions.delete(sessionKey);
  }

  // Clear all sessions for an admin
  clearAllAdminSessions(adminId) {
    for (const [key] of this.adminSessions) {
      if (key.startsWith(`${adminId}_`)) {
        this.adminSessions.delete(key);
      }
    }
  }

  // Get active admin sessions
  getActiveAdminSessions() {
    const sessions = [];
    const now = new Date();
    
    for (const [key, session] of this.adminSessions) {
      const inactiveTime = (now - session.lastActivity) / 1000 / 60; // in minutes
      
      // Remove sessions inactive for more than 2 hours
      if (inactiveTime > 120) {
        this.adminSessions.delete(key);
      } else {
        sessions.push({
          sessionKey: key,
          ...session,
          inactiveMinutes: Math.floor(inactiveTime)
        });
      }
    }
    
    return sessions;
  }
}
