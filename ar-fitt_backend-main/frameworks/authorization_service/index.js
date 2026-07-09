import { AuthorizationServiceController } from "../../adapters/express/controllers/AuthorizationServiceController.js";
import { AuthService } from "../../middleware/authorization_service/usecases/AuthService.js";
import { RefreshTokenUseCase } from "../../usecases/authorization_service/RefreshToken.js";
import { Headers } from "../../middleware/common/headers.js";

const authServiceMiddleware = new AuthService();
const commonHeaders = new Headers();

const refreshTokenUseCase = new RefreshTokenUseCase(authServiceMiddleware);

export const authorizationServiceController =
  new AuthorizationServiceController(refreshTokenUseCase, commonHeaders);
