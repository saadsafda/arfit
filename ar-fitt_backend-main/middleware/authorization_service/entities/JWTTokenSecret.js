import crypto from "crypto";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";
import { EnvironmentVariables } from "../../../infra/config/environment/EnvironmentVariables.js";

export class JWTTokenSecret {
  static accessTokenSecret = "";
  static refreshTokenSecret = "";

  generateAccessTokenSecret() {
    if (EnvironmentVariables.SIGN_ACCESS_TOKEN_PRIVATE_KEY != "") {
      JWTTokenSecret.accessTokenSecret =
        EnvironmentVariables.SIGN_ACCESS_TOKEN_PRIVATE_KEY;
    }

    if (JWTTokenSecret.accessTokenSecret == "") {
      JWTTokenSecret.accessTokenSecret = crypto
        .randomBytes(CommonConstants.JWT_TOKEN_SECRET_SIZE)
        .toString("hex");
      return JWTTokenSecret.accessTokenSecret;
    } else {
      return JWTTokenSecret.accessTokenSecret;
    }
  }

  generateRefreshTokenSecret() {
    if (EnvironmentVariables.SIGN_REFRESH_TOKEN_PRIVATE_KEY != "") {
      JWTTokenSecret.refreshTokenSecret =
        EnvironmentVariables.SIGN_REFRESH_TOKEN_PRIVATE_KEY;
    }

    if (JWTTokenSecret.refreshTokenSecret == "") {
      JWTTokenSecret.refreshTokenSecret = crypto
        .randomBytes(CommonConstants.JWT_TOKEN_SECRET_SIZE)
        .toString("hex");
      return JWTTokenSecret.refreshTokenSecret;
    } else {
      return JWTTokenSecret.refreshTokenSecret;
    }
  }
}
