import express from "express";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

const defaultApiResponseMessage = new APIResponseMessage(
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
);

export class UserBodyMatrixController {
  constructor(
    createUserBodyMatrixUseCase,
    fetchUserBodyMatrixUseCase,
    updateUserBodyMatrixUseCase,
    deleteUserBodyMatrixUseCase,
    authServiceMiddleware,
    commonHeaders
  ) {
    this.createUserBodyMatrixUseCase = createUserBodyMatrixUseCase;
    this.fetchUserBodyMatrixUseCase = fetchUserBodyMatrixUseCase;
    this.updateUserBodyMatrixUseCase = updateUserBodyMatrixUseCase;
    this.deleteUserBodyMatrixUseCase = deleteUserBodyMatrixUseCase;
    this.authServiceMiddleware = authServiceMiddleware;
    this.commonHeaders = commonHeaders;
  }

  async createUserBodyMatrix(req, res) {
    const { email, bodyMatrix } = req.body;
    const useCaseResponse = await this.createUserBodyMatrixUseCase.execute(
      email,
      bodyMatrix
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async fetchUserBodyMatrix(req, res) {
    const email = req.query.email;
    const useCaseResponse = await this.fetchUserBodyMatrixUseCase.execute(
      email
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async updateUserBodyMatrix(req, res) {
    const { email, bodyMatrix } = req.body;
    const useCaseResponse = await this.updateUserBodyMatrixUseCase.execute(
      email,
      bodyMatrix
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async deleteUserBodyMatrix(req, res) {
    const email = req.query.email;
    const useCaseResponse = await this.deleteUserBodyMatrixUseCase.execute(
      email
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  createExpressController() {
    const router = new express.Router();
    router.post(
      "/bodyMatrix",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.createUserBodyMatrix.bind(this)
    );
    router.get(
      "/bodyMatrix",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.fetchUserBodyMatrix.bind(this)
    );
    router.put(
      "/bodyMatrix",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.updateUserBodyMatrix.bind(this)
    );
    router.delete(
      "/bodyMatrix",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.deleteUserBodyMatrix.bind(this)
    );
    return router;
  }
}
