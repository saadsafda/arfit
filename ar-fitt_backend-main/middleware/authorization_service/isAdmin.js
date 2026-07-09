import { CommonConstants } from "../../infra/utils/common/Constants.js";

export class IsAdminMiddleware {
  constructor() {}

  verifyAdminRole(req, res, next) {
    try {
      // Check if user exists in request (set by auth middleware)
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized: User not authenticated",
          status: CommonConstants.FAILURE_STATUS,
        });
      }

      // Check if user has admin role
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Forbidden: Admin access required",
          status: CommonConstants.FAILURE_STATUS,
        });
      }

      // User is admin, proceed to next middleware/route
      next();
    } catch (error) {
      console.error("Error in admin role verification:", error);
      return res.status(500).json({
        message: "Internal server error during admin verification",
        status: CommonConstants.FAILURE_STATUS,
      });
    }
  }
}

