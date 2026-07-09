import { AuthService } from "./AuthService.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

const invalidTokenResponse = new APIResponseMessage(
  APIResponseConstants.INVALID_TOKEN_MESSAGE,
  APIResponseConstants.INVALID_TOKEN_CODE
);

export class AuthServiceMiddleware {
  verifyToken(userTypes, req, res, next) {
    const authService = new AuthService();
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(APIResponseConstants.INVALID_TOKEN_STATUS_CODE)
        .send(JSON.stringify(invalidTokenResponse));
    }

    const returnedValues = authService.verifyAccessToken(token, userTypes);
    if (!returnedValues[0]) {
      return res
        .status(APIResponseConstants.INVALID_TOKEN_STATUS_CODE)
        .send(JSON.stringify(invalidTokenResponse));
    }

    req.userType = returnedValues[1];
    next();
  }
}
