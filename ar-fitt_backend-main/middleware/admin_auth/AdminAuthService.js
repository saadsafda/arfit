import jsonWebToken from "jsonwebtoken";
import { v4 } from "uuid";
import crypto from "crypto";
import { EnvironmentVariables } from "../../infra/config/environment/EnvironmentVariables.js";

class AdminAuthService {
  constructor() {
    // Use consistent admin JWT secrets - completely separate from user auth
    // These secrets should remain the same across server restarts
    this.ADMIN_ACCESS_TOKEN_SECRET = this.getAdminSecret("admin-access");
    this.ADMIN_REFRESH_TOKEN_SECRET = this.getAdminSecret("admin-refresh");
    this.ADMIN_SESSION_SECRET = this.getAdminSecret("admin-session");
  }

  getAdminSecret(type) {
    // Generate a consistent secret for admin authentication
    // Using environment variable as base, but adding admin-specific salt
    const baseSecret = EnvironmentVariables.SIGN_ACCESS_TOKEN_PRIVATE_KEY || "default-admin-secret";
    const adminSalt = `ADMIN_ONLY_${type}_SECRET`;
    return crypto
      .createHash('sha512')
      .update(baseSecret + adminSalt)
      .digest('hex');
  }

  generateAdminToken(adminId, adminEmail) {
    const payload = {
      id: v4(),
      adminId: adminId,
      email: adminEmail,
      type: "ADMIN_AUTH_TOKEN",
      isAdmin: true,
      timestamp: Date.now(),
      random: crypto.randomBytes(16).toString('hex')
    };

    const options = {
      algorithm: "HS512", // Different algorithm than user tokens
      expiresIn: "2h", // Shorter expiry for admin tokens
      issuer: "ARFitt-Admin-System",
      audience: "ARFitt-Admin-Panel"
    };

    try {
      const accessToken = jsonWebToken.sign(
        payload,
        this.ADMIN_ACCESS_TOKEN_SECRET,
        options
      );

      // Generate refresh token with longer expiry
      const refreshOptions = {
        ...options,
        expiresIn: "7d" // 7 days for refresh token
      };

      const refreshToken = jsonWebToken.sign(
        { ...payload, type: "ADMIN_REFRESH_TOKEN" },
        this.ADMIN_REFRESH_TOKEN_SECRET,
        refreshOptions
      );

      return {
        accessToken,
        refreshToken,
        expiresIn: 7200, // 2 hours in seconds
        tokenType: "Bearer",
        isAdminToken: true
      };
    } catch (error) {
      console.error("Error generating admin token:", error);
      return null;
    }
  }

  verifyAdminAccessToken(token) {
    try {
      const decoded = jsonWebToken.verify(token, this.ADMIN_ACCESS_TOKEN_SECRET, {
        issuer: "ARFitt-Admin-System",
        audience: "ARFitt-Admin-Panel",
        algorithms: ["HS512"]
      });

      // Double-check this is an admin token
      if (decoded.type !== "ADMIN_AUTH_TOKEN" || !decoded.isAdmin) {
        return { valid: false, error: "Invalid admin token type" };
      }

      return {
        valid: true,
        adminId: decoded.adminId,
        email: decoded.email,
        tokenId: decoded.id
      };
    } catch (error) {
      console.error("Admin token verification failed:", error.message);
      return { valid: false, error: error.message };
    }
  }

  verifyAdminRefreshToken(token) {
    try {
      const decoded = jsonWebToken.verify(token, this.ADMIN_REFRESH_TOKEN_SECRET, {
        issuer: "ARFitt-Admin-System",
        audience: "ARFitt-Admin-Panel",
        algorithms: ["HS512"]
      });

      if (decoded.type !== "ADMIN_REFRESH_TOKEN" || !decoded.isAdmin) {
        return { valid: false, error: "Invalid admin refresh token" };
      }

      return {
        valid: true,
        adminId: decoded.adminId,
        email: decoded.email
      };
    } catch (error) {
      console.error("Admin refresh token verification failed:", error.message);
      return { valid: false, error: error.message };
    }
  }

  refreshAdminToken(refreshToken) {
    const verification = this.verifyAdminRefreshToken(refreshToken);
    
    if (!verification.valid) {
      return null;
    }

    // Generate new access token
    return this.generateAdminToken(verification.adminId, verification.email);
  }

  // Generate a secure session token for admin
  generateAdminSessionToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Hash password specifically for admin accounts
  hashAdminPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { salt, hash };
  }

  // Verify admin password
  verifyAdminPassword(password, salt, hash) {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
  }
}

// Singleton instance to ensure consistent secrets across the application
let adminAuthServiceInstance = null;

export function getAdminAuthService() {
  if (!adminAuthServiceInstance) {
    adminAuthServiceInstance = new AdminAuthService();
  }
  return adminAuthServiceInstance;
}

export { AdminAuthService };
