import { PaymentController } from "../../adapters/express/controllers/PaymentController.js";
import { UserRepository } from "../../adapters/database/repositories/UserRepository.js";
import { UserSubscriptionRepository } from "../../adapters/database/repositories/UserSubscriptionRepository.js";
import { PaymentServiceUserRespository } from "../../adapters/database/repositories/PaymentServiceUserRepository.js";
import { PaymentServiceAdapter } from "../../adapters/payment_service/PaymentServiceAdapter.js";
import { CreateSubscriptionUseCase } from "../../usecases/payment/CreateSubscription.js";
import { ProcessWebhookEventsUseCase } from "../../usecases/payment/ProcessWebhookEvents.js";
import { UpdateSubscriptionUseCase } from "../../usecases/payment/UpdateSubscription.js";
import { CancelSubscriptionUseCase } from "../../usecases/payment/CancelSubscription.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";
import { EmailValidation } from "../../middleware/data_validation/EmailValidation.js";
import { SubscriptionValidation } from "../../middleware/data_validation/SubscriptionValidation.js";

const paymentServiceAdapter = new PaymentServiceAdapter();
const userRepository = new UserRepository();
const userSubscriptionRepository = new UserSubscriptionRepository();
const paymentServiceUserRespository = new PaymentServiceUserRespository();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();
const emailValidation = new EmailValidation();
const subscriptionValidation = new SubscriptionValidation();

const createSubscriptionUseCase = new CreateSubscriptionUseCase(
  userRepository,
  paymentServiceAdapter,
  userSubscriptionRepository,
  paymentServiceUserRespository
);
const processWebhookEventsUseCase = new ProcessWebhookEventsUseCase(
  userRepository,
  paymentServiceAdapter,
  userSubscriptionRepository,
  paymentServiceUserRespository
);
const updateSubscriptionUseCase = new UpdateSubscriptionUseCase(
  userRepository,
  paymentServiceAdapter,
  userSubscriptionRepository
);

const cancelSubscriptionUseCase = new CancelSubscriptionUseCase(
  userRepository,
  paymentServiceAdapter,
  userSubscriptionRepository
);

export const paymentController = new PaymentController(
  createSubscriptionUseCase,
  processWebhookEventsUseCase,
  updateSubscriptionUseCase,
  cancelSubscriptionUseCase,
  authServiceMiddleware,
  commonHeaders,
  emailValidation,
  subscriptionValidation
);
