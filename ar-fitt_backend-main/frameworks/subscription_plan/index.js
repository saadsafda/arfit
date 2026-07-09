import { SubscriptionPlanController } from "../../adapters/express/controllers/SubscriptionPlanController.js";
import { PaymentServiceAdapter } from "../../adapters/payment_service/PaymentServiceAdapter.js";
import { FetchSubscriptionPlanUseCase } from "../../usecases/subscription_plan/FetchSubscriptionPlan.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";

const paymentServiceAdapter = new PaymentServiceAdapter();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();

const fetchSubscriptionPlanUseCase = new FetchSubscriptionPlanUseCase(
  paymentServiceAdapter
);
export const subscriptionPlanController = new SubscriptionPlanController(
  fetchSubscriptionPlanUseCase,
  authServiceMiddleware,
  commonHeaders
);
