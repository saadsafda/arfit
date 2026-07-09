import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../infra/utils/common/Constants.js";
import { SubscriptionPlan } from "../../entities/SubscriptionPlan.js";

export class FetchSubscriptionPlanUseCase {
  constructor(paymentServiceAdapter) {
    this.paymentServiceAdapter = paymentServiceAdapter;
  }

  async execute() {
    const repoReturnedValues = await this.paymentServiceAdapter.getProducts();
    if (repoReturnedValues[1] != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    if (!repoReturnedValues[0]) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.NO_SUBSCRIPTION_FOUND_MESSAGE,
          APIResponseConstants.NO_SUBSCRIPTION_FOUND_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    var subscriptions = [];

    for (const product of repoReturnedValues[0]) {
      const productPricesResponse = await this.getProductPrices(product["id"]);
      if (productPricesResponse[1] != null) {
        return productPricesResponse[1];
      }

      const productPrice = productPricesResponse[0][0];

      const subscriptionPlan = new SubscriptionPlan(
        product["id"],
        productPrice["unit_amount"],
        productPrice["id"],
        productPrice["currency"],
        null,
        null
      );

      switch (product["metadata"]["type"]) {
        case CommonConstants.SUBSCRIPTION_PLAN_TYPE_RECURRING:
          subscriptionPlan.setInterval(productPrice["recurring"]["interval"]);
          subscriptionPlan.setRecurring(true);
          break;
        case CommonConstants.SUBSCRIPTION_PLAN_TYPE_ONE_TIME:
          subscriptionPlan.setInterval(null);
          subscriptionPlan.setRecurring(false);
          break;
        default:
          return new APIResponse(
            new APIResponseMessage(
              APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
              APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
            ),
            APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
          );
      }

      subscriptions.push(subscriptionPlan);
    }

    return new APIResponse(
      new APIResponseMessage(
        subscriptions,
        APIResponseConstants.SUBSCTIPTION_FOUND_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }

  async getProductPrices(productID) {
    const repoReturnedValues =
      await this.paymentServiceAdapter.getProductPrices(productID);
    if (repoReturnedValues[1] != null) {
      return [
        null,
        new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        ),
      ];
    }

    if (!repoReturnedValues[0]) {
      return [
        null,
        new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.NO_SUBSCRIPTION_FOUND_MESSAGE,
            APIResponseConstants.NO_SUBSCRIPTION_FOUND_MESSAGE_CODE
          ),
          APIResponseConstants.ITEM_NOT_FOUND
        ),
      ];
    }

    return [repoReturnedValues[0], null];
  }
}
