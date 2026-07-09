import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";

export class CancelSubscriptionUseCase {
  constructor(
    userRepository,
    paymentServiceAdapter,
    userSubscriptionRespository
  ) {
    this.userRepository = userRepository;
    this.paymentServiceAdapter = paymentServiceAdapter;
    this.userSubscriptionRespository = userSubscriptionRespository;
  }

  async execute(userEmail) {
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

    const error = await this.paymentServiceAdapter.cancelSubscription(
      userSubscription.getSubscriptionID()
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
        APIResponseConstants.USER_SUBSCRIPTION_DELETE_MESSAGE,
        APIResponseConstants.USER_SUBSCRIPTION_DELETE_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
