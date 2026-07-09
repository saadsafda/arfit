import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";
import { SubscriptionPlan } from "../../../entities/SubscriptionPlan.js";

export class UserSubscriptionDetailsUseCase {
  constructor(
    userRepository,
    userSubscriptionRepository,
    paymentServiceAdapter
  ) {
    this.userRepository = userRepository;
    this.userSubscriptionRepository = userSubscriptionRepository;
    this.paymentServiceAdapter = paymentServiceAdapter;
  }

  async execute(email) {
    let repoReturnedValues = await this.userRepository.getUserByEmail(email);
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
          APIResponseConstants.USER_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    const user = repoReturnedValues[0];

    repoReturnedValues =
      await this.userSubscriptionRepository.getUserSubscriptionByUserID(
        user.getID()
      );
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
          APIResponseConstants.USER_NOT_SUBSCRIBED_MESSAGE,
          APIResponseConstants.USER_NOT_SUBSCRIBED_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    const userSubscription = repoReturnedValues[0];

    repoReturnedValues = await this.paymentServiceAdapter.getProductDetails(
      userSubscription.getSubscriptionPlanID()
    );
    if (repoReturnedValues[1] != null || !repoReturnedValues[0]) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    const planDetails = repoReturnedValues[0];

    repoReturnedValues = await this.paymentServiceAdapter.getProductPrices(
      userSubscription.getSubscriptionPlanID()
    );
    if (repoReturnedValues[1] != null || !repoReturnedValues[0]) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    const planPriceDetails = repoReturnedValues[0][0];

    const subscriptionPlan = new SubscriptionPlan(
      userSubscription.getSubscriptionPlanID(),
      planPriceDetails["unit_amount"],
      planPriceDetails["id"],
      planPriceDetails["currency"],
      null,
      null
    );

    switch (planDetails["metadata"]["type"]) {
      case CommonConstants.SUBSCRIPTION_PLAN_TYPE_RECURRING:
        subscriptionPlan.setInterval(planPriceDetails["recurring"]["interval"]);
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

    return new APIResponse(
      new APIResponseMessage(
        subscriptionPlan,
        APIResponseConstants.SUBSCTIPTION_FOUND_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
