import { EnvironmentVariables } from "../../infra/config/environment/EnvironmentVariables.js";
import { CommonConstants } from "../../infra/utils/common/Constants.js";
import Stripe from "stripe";

const stripe = Stripe(EnvironmentVariables.PAYMENT_SERVICE_API_KEY);

export class PaymentServiceAdapter {
  async getProducts() {
    const productQueryParams = {
      active: true,
      limit: 3,
    };

    return stripe.products
      .list(productQueryParams)
      .then((products) => {
        return [products.data, null];
      })
      .catch((error) => {
        console.log("failed to list products from stripe, error: ", error);
        return [null, error];
      });
  }

  async getProductPrices(productID) {
    const priceQueryParams = {
      product: productID,
      active: true,
      limit: 1,
    };
    return stripe.prices
      .list(priceQueryParams)
      .then((prices) => {
        return [prices.data, null];
      })
      .catch((error) => {
        console.log(
          "failed to list prices for a product from stripe, error: ",
          error
        );
        return [null, error];
      });
  }

  async getPriceDetails(priceID) {
    return stripe.prices
      .retrieve(priceID)
      .then((price) => {
        return [price, null];
      })
      .catch((error) => {
        console.log(
          "failed to fetch price information from stripe, error: ",
          error
        );
        return [null, error];
      });
  }

  async getProductDetails(productID) {
    return stripe.products
      .retrieve(productID)
      .then((product) => {
        return [product, null];
      })
      .catch((error) => {
        console.log(
          "failed to fetch product information from stripe, error: ",
          error
        );
        return [null, error];
      });
  }

  async createCheckoutSession(userID, priceID, params) {
    let sessionParams = {
      client_reference_id: userID,
      mode: CommonConstants.CHECKOUT_MODE_SUBSCRIPTION,
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      success_url: EnvironmentVariables.PAYMENT_SERVICE_SUCCESS_URL,
      cancel_url: EnvironmentVariables.PAYMENT_SERVICE_CANCEL_URL,
    };
    sessionParams = { ...sessionParams, ...params };

    return stripe.checkout.sessions
      .create(sessionParams)
      .then((session) => {
        return [session.url, null];
      })
      .catch((error) => {
        console.log("failed to create checkout session, error: ", error);
        return [null, null];
      });
  }

  async retrieveCheckoutSession(sessionID) {
    return stripe.checkout.sessions
      .retrieve(sessionID)
      .then((session) => {
        return [session, null];
      })
      .catch((error) => {
        console.log("failed to retrieve checkout session, error: ", error);
        return [null, error];
      });
  }

  async verifyWebhookSignature(requestBody, signature) {
    try {
      const event = stripe.webhooks.constructEvent(
        requestBody,
        signature,
        EnvironmentVariables.PAYMENT_SERVICE_WEBHOOK_API_KEY
      );
      return [event.data, event.type, null];
    } catch (err) {
      console.log("webhook signature validation failed, error: ", err);
      return [null, null, err];
    }
  }

  async retrieveSubscription(subscriptionID) {
    return await stripe.subscriptions
      .retrieve(subscriptionID)
      .then((subscription) => {
        return [subscription, null];
      })
      .catch((error) => {
        console.log("failed to retrive subscription, error: ", error);
        return [null, error];
      });
  }

  async updateSubscription(subscriptionID, priceID, invoiceID, prorationDate) {
    try {
      await stripe.subscriptions.update(subscriptionID, {
        items: [{ id: invoiceID, price: priceID }],
        proration_date: prorationDate,
      });
      return null;
    } catch (error) {
      console.log("failed to update subscription, error: ", error);
      return error;
    }
  }

  async updateSubscriptionCancellationAtPeriodEnd(
    subscriptionID,
    cancelAfterPeriod
  ) {
    try {
      await stripe.subscriptions.update(subscriptionID, {
        cancel_at_period_end: cancelAfterPeriod,
      });
      return null;
    } catch (error) {
      console.log("failed to upate subscription cancellation period: ", error);
      return error;
    }
  }

  async cancelSubscription(subscriptionID) {
    try {
      await stripe.subscriptions.cancel(subscriptionID);
      return null;
    } catch (error) {
      console.log("failed to delete subscription, error: ", error);
      return error;
    }
  }
}
