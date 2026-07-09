import jsonWebToken from "jsonwebtoken";
import { v4 } from "uuid";
import util from "util";
import { JWTToken } from "../entities/JWTToken.js";
import { JWTTokenSecret } from "../entities/JWTTokenSecret.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";
import { EnvironmentVariables } from "../../../infra/config/environment/EnvironmentVariables.js";

export class AuthService {
  generateToken(userID, clientType, userType) {
    const jwtToken = new JWTToken();
    // setting header
    jwtToken.setAlgorithm(CommonConstants.JWT_TOKEN_ALGORITHM);
    jwtToken.setType(CommonConstants.JWT_TOKEN_TYPE);

    // setting payload
    jwtToken.setID(v4());
    jwtToken.setIssuer(
      util.format(
        "%s:%s",
        EnvironmentVariables.SERVER_HOST_URL,
        EnvironmentVariables.EXPRESS_APP_PORT
      )
    );
    jwtToken.setSubject(userID);
    jwtToken.setAudience(EnvironmentVariables.ALLOWED_ORIGIN_URL);
    jwtToken.setUserType(userType);

    const currentDateTime = new Date().getTime() / 1000;

    let expirtyTimeAddOn;
    switch (userType) {
      case CommonConstants.GUEST_USER_TYPE:
        expirtyTimeAddOn = 86400; // 60 * 60 * 24
        break;
      case CommonConstants.REGISTERED_USER_TYPE:
        expirtyTimeAddOn = 3600; // 60 * 60
        break;
      default:
        // default time incase user type is not defined
        expirtyTimeAddOn = 3600;
        break;
    }

    let expiryDateTime = currentDateTime + expirtyTimeAddOn;

    jwtToken.setNotBefore(
      currentDateTime - CommonConstants.NOT_BEFORE_BUFFER_TIME
    );
    jwtToken.setIssuedAt(currentDateTime);
    jwtToken.setExpiry(expiryDateTime);

    const jwtTokenSecret = new JWTTokenSecret();
    var accessToken, refreshToken;

    try {
      accessToken = jsonWebToken.sign(
        jwtToken.getPayload(),
        jwtTokenSecret.generateAccessTokenSecret(),
        jwtToken.getHeader()
      );
    } catch (error) {
      console.log("unable to generate token, error: ", error);
      return null;
    }

    if (clientType == null || clientType == CommonConstants.CLIENT_TYPE_WEB) {
      return accessToken;
    }

    try {
      expiryDateTime = currentDateTime + 24 * 60 * 60 * 30;
      jwtToken.setExpiry(expiryDateTime);

      refreshToken = jsonWebToken.sign(
        jwtToken.getPayload(),
        jwtTokenSecret.generateRefreshTokenSecret(),
        jwtToken.getHeader()
      );
    } catch (error) {
      console.log("unable to generate token, error: ", error);
      return null;
    }

    return [accessToken, refreshToken];
  }

  verifyAccessToken(token, userTypes) {
    const verifyOptions = {
      issuer: util.format(
        "%s:%s",
        EnvironmentVariables.SERVER_HOST_URL,
        EnvironmentVariables.EXPRESS_APP_PORT
      ),
      audience: EnvironmentVariables.ALLOWED_ORIGIN_URL,
    };

    const jwtTokenSecret = new JWTTokenSecret();
    try {
      const refreshTokenPayload = jsonWebToken.verify(
        token,
        jwtTokenSecret.generateAccessTokenSecret(),
        verifyOptions
      );
      if (
        userTypes == null ||
        (userTypes != null &&
          !userTypes.includes(refreshTokenPayload["userType"]))
      ) {
        return [false, null];
      }
      return [true, refreshTokenPayload["userType"]];
    } catch (error) {
      console.log("unable to verify token, error: ", error);
      return [false, null];
    }
  }

  verifyRefreshToken(token) {
    const verifyOptions = {
      issuer: util.format(
        "%s:%s",
        EnvironmentVariables.SERVER_HOST_URL,
        EnvironmentVariables.EXPRESS_APP_PORT
      ),
      audience: EnvironmentVariables.ALLOWED_ORIGIN_URL,
    };

    const jwtTokenSecret = new JWTTokenSecret();
    try {
      return jsonWebToken.verify(
        token,
        jwtTokenSecret.generateRefreshTokenSecret(),
        verifyOptions
      );
    } catch (error) {
      console.log("unable to verify token, error: ", error);
      return null;
    }
  }
}
