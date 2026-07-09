import express from "express";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

const defaultApiResponseMessage = new APIResponseMessage(
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
);

export class SubscriptionPlanController {
  constructor(
    fetchSubscriptionPlanUseCase,
    authServiceMiddleware,
    commonHeaders
  ) {
    this.fetchSubscriptionPlanUseCase = fetchSubscriptionPlanUseCase;
    this.authServiceMiddleware = authServiceMiddleware;
    this.commonHeaders = commonHeaders;
  }

  async getSubscriptions(_, res) {
    const useCaseResponse = await this.fetchSubscriptionPlanUseCase.execute();
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
    router.get(
      "/subscriptionPlans",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.getSubscriptions.bind(this)
    );
    return router;
  }
}
