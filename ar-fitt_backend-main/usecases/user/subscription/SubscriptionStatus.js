import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class SubscriptionStatusUseCase {
  constructor(userRepository, paymentServiceAdapter) {
    this.userRepository = userRepository;
    this.paymentServiceAdapter = paymentServiceAdapter;
  }

  async execute(email, sessionID = null) {
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

    // If session ID is provided, verify payment status with Stripe first
    if (sessionID) {
      console.log("Verifying checkout session:", sessionID);
      const sessionResult = await this.paymentServiceAdapter.retrieveCheckoutSession(sessionID);
      
      if (sessionResult[0]) {
        const session = sessionResult[0];
        console.log("Checkout session status:", session.payment_status);
        
        // If payment is complete, mark user as subscribed
        if (session.payment_status === 'paid' || session.payment_status === 'complete') {
          console.log("Payment is complete, marking user as subscribed");
          await this.userRepository.markeUserSubscribed(email);
          return new APIResponse(
            new APIResponseMessage(
              APIResponseConstants.USER_SUBSCRIBED_MESSAGE,
              APIResponseConstants.USER_SUBSCRIBED_MESSAGE_CODE
            ),
            APIResponseConstants.SUCCESS_STATUS_CODE
          );
        }
      }
    }

    // Standard check of subscription status in database
    if (user.getIsSubscribed()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_SUBSCRIBED_MESSAGE,
          APIResponseConstants.USER_SUBSCRIBED_MESSAGE_CODE
        ),
        APIResponseConstants.SUCCESS_STATUS_CODE
      );
    } else {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_NOT_SUBSCRIBED_MESSAGE,
          APIResponseConstants.USER_NOT_SUBSCRIBED_MESSAGE_CODE
        ),
        APIResponseConstants.SUCCESS_STATUS_CODE
      );
    }
  }
}
