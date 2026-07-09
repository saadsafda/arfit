import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { PaymentCheckoutSession } from "../../entities/PaymentCheckoutSession.js";

export class CreateSubscriptionUseCase {
  constructor(
    userRepository,
    paymentServiceAdapter,
    userSubscriptionRespository,
    paymentServiceUserRepository
  ) {
    this.userRepository = userRepository;
    this.paymentServiceAdapter = paymentServiceAdapter;
    this.userSubscriptionRespository = userSubscriptionRespository;
    this.paymentServiceUserRepository = paymentServiceUserRepository;
  }

 

  async execute(userEmail, priceID) 
  { console.log("execute");
    console.log("priceID", priceID);
    console.log("userEmail", userEmail);
    let repoReturnedValues = await this.userRepository.getUserByEmail(
      userEmail
    );
    console.log("repoReturnedValues", repoReturnedValues);
    if (repoReturnedValues[1] != null) {

      console.log("repoReturnedValues[1]", repoReturnedValues[1]);

      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    if (!repoReturnedValues[0]) {

      console.log("USER NOT EXIST");
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    const user = repoReturnedValues[0];
    console.log("User object:", user);
    const userID = user.getID();
    console.log("User ID:", userID);
    console.log("User email:", user.getEmail());
    console.log("User isSubscribed:", user.getIsSubscribed());

    // Validate user ID before proceeding
    if (!userID || typeof userID !== 'string' || userID.trim() === '') {
      console.log("Invalid user ID:", userID);
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    repoReturnedValues =
      await this.userSubscriptionRespository.getUserSubscriptionByUserID(
        userID
      );

    console.log("repoReturnedValuesubscription", repoReturnedValues);

    if (repoReturnedValues[1] != null) {

      console.log("repoReturnedValues[1] subscription", repoReturnedValues[1]);
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    let userSubscription = null;
    if (!!repoReturnedValues[0]) {
      userSubscription = repoReturnedValues[0];
      console.log("Found existing user subscription:", userSubscription);
    } else {
      console.log("No existing user subscription found");
    }

    repoReturnedValues =
      await this.paymentServiceUserRepository.getPaymentServiceUserByUserID(
        userID
      );
    console.log("repoReturnedValues paymentServiceUser", repoReturnedValues);
    
    if (repoReturnedValues[1] != null) {

      console.log("repoReturnedValues[1] paymentServiceUser", repoReturnedValues[1]);
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    let paymentServiceUser = null;
    if (!!repoReturnedValues[0]) {
      paymentServiceUser = repoReturnedValues[0];
      console.log("Found existing payment service user:", paymentServiceUser);
    } else {
      console.log("No existing payment service user found");
    }

    let sessionParams;

    // Debug logging
    console.log("userSubscription:", userSubscription);
    console.log("paymentServiceUser:", paymentServiceUser);
    console.log("user.getIsSubscribed():", user.getIsSubscribed());

    if (!userSubscription && !paymentServiceUser && !user.getIsSubscribed()) {
      // Case 1: when we have a newly registered user
      console.log("Case 1: New user - creating checkout with email");
      sessionParams = {
        customer_email: user.getEmail(),
      };
    } else if (
      !userSubscription &&
      !!paymentServiceUser &&
      !user.getIsSubscribed()
    ) {
      // Case 2: when the user is renewing the subscription (subscription was cancelled before)
      console.log("Case 2: Renewing user - creating checkout with existing customer");
      sessionParams = {
        customer: paymentServiceUser.getPaymentServiceUserID(),
      };
    } else if (user.getIsSubscribed()) {
      // Case 3: User is marked as subscribed but has no subscription records
      // This is a data inconsistency - fix it by allowing subscription creation
      console.log("Case 3: User marked as subscribed but no subscription records found - fixing data inconsistency");
      console.log("Allowing subscription creation to fix the data state");
      
      // Reset the user's subscription status to false since no records exist
      await this.userRepository.markUserUnsubscribedByEmail(user.getEmail());
      
      // Proceed with Case 1: New user subscription
      console.log("Case 1: Creating checkout with email after fixing data state");
      sessionParams = {
        customer_email: user.getEmail(),
      };
    } else {
      // Case 4: Unexpected state - log details and return error
      console.log("ELSE - Unexpected state:");
      console.log("- userSubscription:", !!userSubscription);
      console.log("- paymentServiceUser:", !!paymentServiceUser);
      console.log("- user.getIsSubscribed():", user.getIsSubscribed());
      
      return new APIResponse(
        new APIResponseMessage(
          "Unexpected subscription state",
          "UNEXPECTED_SUBSCRIPTION_STATE"
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    repoReturnedValues = await this.paymentServiceAdapter.createCheckoutSession(
      userID,
      priceID,
      sessionParams
    );
    if (repoReturnedValues[1] != null || !repoReturnedValues[0]) {

      console.log("repoReturnedValues[1] paymentServiceAdapter", repoReturnedValues[1]);
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    const paymnetCheckoutSession = new PaymentCheckoutSession(
      repoReturnedValues[0]
    );

    return new APIResponse(
      new APIResponseMessage(
        paymnetCheckoutSession,
        APIResponseConstants.PAYMENT_CHECKOUT_SESSSION_CREATED_MESSAGE_CODE
      ),
      APIResponseConstants.ITEM_CREATED_STATUS_CODE
    );
  }
}
