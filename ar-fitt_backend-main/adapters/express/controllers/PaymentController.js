import express from "express";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

const defaultApiResponseMessage = new APIResponseMessage(
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
);

export class PaymentController {
  constructor(
    createSubscriptionUseCase,
    processWebhookEventsUseCase,
    updateSubscriptionUseCase,
    cancelSubscriptionUseCase,
    authServiceMiddleware,
    commonHeaders,
    emailValidation,
    subscriptionValidation
  ) {
    this.createSubscriptionUseCase = createSubscriptionUseCase;
    this.processWebhookEventsUseCase = processWebhookEventsUseCase;
    this.updateSubscriptionUseCase = updateSubscriptionUseCase;
    this.cancelSubscriptionUseCase = cancelSubscriptionUseCase;
    this.authServiceMiddleware = authServiceMiddleware;
    this.commonHeaders = commonHeaders;
    this.emailValidation = emailValidation;
    this.subscriptionValidation = subscriptionValidation;
  }

  async createSubscription(req, res) {

    console.log("req.body", req.body);
    const { userEmail, priceID } = req.body;
    const useCaseResponse = await this.createSubscriptionUseCase.execute(
      userEmail,
      priceID
    );

    console.log("useCaseResponse", useCaseResponse);
    
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

  async processWebhookEvents(req, res) {
    const useCaseResponse = await this.processWebhookEventsUseCase.execute(
      req.body,
      req.headers[CommonConstants.STRIPE_SIGNATURE]
    );
    if (useCaseResponse == null) {
      return res.sendStatus(APIResponseConstants.BAD_REQUEST);
    }
    res.sendStatus(useCaseResponse.getStatusCode());
  }

  async updateSubscription(req, res) {
    const { userEmail, priceID } = req.body;
    const useCaseResponse = await this.updateSubscriptionUseCase.execute(
      userEmail,
      priceID
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

  async cancelSubscription(req, res) {
    const userEmail = req.query.email;
    const useCaseResponse = await this.cancelSubscriptionUseCase.execute(
      userEmail
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
      "/payment/createSubscription",
      express.json(),
      this.commonHeaders.addCommonHeaders.bind(this),
      // this.authServiceMiddleware.verifyToken.bind(
      //   this,
      //   CommonConstants.ONLY_REGISTERED_USER_ACCESS
      // ),
      // this.subscriptionValidation.validate.bind(this),
      this.createSubscription.bind(this)
    );
    router.post(
      "/payment/webhook",
      express.raw({ type: "application/json" }),
      this.processWebhookEvents.bind(this)
    );
    router.post(
      "/payment/updateSubscription",
      express.json(),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.subscriptionValidation.validate.bind(this),
      this.updateSubscription.bind(this)
    );
    router.get(
      "/payment/cancelSubscription",
      express.json(),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.emailValidation.validate.bind(this),
      this.cancelSubscription.bind(this)
    );
    return router;
  }
}
