import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

export class UpdateSubscriptionUseCase {
  constructor(
    userRepository,
    paymentServiceAdapter,
    userSubscriptionRespository
  ) {
    this.userRepository = userRepository;
    this.paymentServiceAdapter = paymentServiceAdapter;
    this.userSubscriptionRespository = userSubscriptionRespository;
  }

  async execute(userEmail, priceID) {
    let repoReturnedValues = await this.userRepository.getUserByEmail(
      userEmail
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
          APIResponseConstants.USER_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    const user = repoReturnedValues[0];

    if (!user.getIsSubscribed()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_NOT_SUBSCRIBED_MESSAGE,
          APIResponseConstants.USER_NOT_SUBSCRIBED_MESSAGE_CODE
        ),
        APIResponseConstants.BAD_REQUEST
      );
    }

    repoReturnedValues =
      await this.userSubscriptionRespository.getUserSubscriptionByUserID(
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
        APIResponseConstants.BAD_REQUEST
      );
    }
    const userSubscription = repoReturnedValues[0];

    repoReturnedValues = await this.paymentServiceAdapter.retrieveSubscription(
      userSubscription.getSubscriptionID()
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
          APIResponseConstants.NO_SUBSCRIPTION_FOUND_MESSAGE,
          APIResponseConstants.NO_SUBSCRIPTION_FOUND_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    const subscriptionDetails = repoReturnedValues[0];
    const prorationDate = Math.floor(Date.now() / 1000);

    const error = await this.paymentServiceAdapter.updateSubscription(
      userSubscription.getSubscriptionID(),
      priceID,
      subscriptionDetails["items"]["data"][0]["id"],
      prorationDate
    );

    if (error != null) {
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
        APIResponseConstants.USER_SUBSCRIPTION_UPDATE_MESSAGE,
        APIResponseConstants.USER_SUBSCRIPTION_UPDATE_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
