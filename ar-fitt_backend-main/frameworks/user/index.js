import { UserController } from "../../adapters/express/controllers/UserController.js";
import { UserRepository } from "../../adapters/database/repositories/UserRepository.js";
import { UserCredentialRepository } from "../../adapters/database/repositories/UserCredentialRepository.js";
import { UserOTPRepository } from "../../adapters/database/repositories/UserOTPRepository.js";
import { UserSubscriptionRepository } from "../../adapters/database/repositories/UserSubscriptionRepository.js";
import { EmailServiceAdapter } from "../../adapters/email_service/EmailServiceAdapter.js";
import { PaymentServiceAdapter } from "../../adapters/payment_service/PaymentServiceAdapter.js";
import { RegisterUserUseCase } from "../../usecases/user/RegisterUser.js";
import { VerifyUserCredentialUseCase } from "../../usecases/user/VerifyUserCredential.js";
import { VerifyUserExistenceUseCase } from "../../usecases/user/VerifyUserExistence.js";
import { RequestPasswordResetUseCase } from "../../usecases/user/RequestPasswordReset.js";
import { ResetUserCredentialUseCase } from "../../usecases/user/ResetUserCredential.js";
import { RequestOTPUseCase } from "../../usecases/user/RequestOTP.js";
import { VerifyOTPUseCase } from "../../usecases/user/VerifyOTP.js";
import { UpdateUserUseCase } from "../../usecases/user/UpdateUser.js";
import { SubscriptionStatusUseCase } from "../../usecases/user/subscription/SubscriptionStatus.js";
import { UserSubscriptionDetailsUseCase } from "../../usecases/user/subscription/UserSubscriptionDetails.js";
import { AuthService } from "../../middleware/authorization_service/usecases/AuthService.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";
import { UserValidation } from "../../middleware/data_validation/UserValidation.js";
import { VerifyOTPValidation } from "../../middleware/data_validation/VerifyOTPValidation.js";
import { UserCredentialValidation } from "../../middleware/data_validation/UserCredentialValidation.js";
import { EmailValidation } from "../../middleware/data_validation/EmailValidation.js";
import { UpdateUserValidation } from "../../middleware/data_validation/UpdateUserValidation.js";

const userRepository = new UserRepository();
const userCredentialRepository = new UserCredentialRepository();
const userOTPRepository = new UserOTPRepository();
const userSubscriptionRepository = new UserSubscriptionRepository();
const emailServiceAdapter = new EmailServiceAdapter();
const paymentServiceAdapter = new PaymentServiceAdapter();
const authService = new AuthService();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();
const emailValidation = new EmailValidation();
const userValidation = new UserValidation();
const verifyOTPValidation = new VerifyOTPValidation();
const userCredentialValidation = new UserCredentialValidation();
const updateUserValidation = new UpdateUserValidation();

const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  userCredentialRepository
);
const verifyUserCredentialUseCase = new VerifyUserCredentialUseCase(
  userRepository,
  userCredentialRepository
);
const verifyUserExistenceUseCase = new VerifyUserExistenceUseCase(
  userRepository,
  userCredentialRepository
);
const requestPasswordResetUseCase = new RequestPasswordResetUseCase(
  emailServiceAdapter,
  userRepository,
  authService
);
const resetUserCredentialUseCase = new ResetUserCredentialUseCase(
  userCredentialRepository
);
const requestOTPUseCase = new RequestOTPUseCase(
  userOTPRepository,
  emailServiceAdapter
);
const verifyOTPUseCase = new VerifyOTPUseCase(
  userOTPRepository,
  userRepository
);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const subscriptionStatusUseCase = new SubscriptionStatusUseCase(userRepository, paymentServiceAdapter);
const userSubscriptionDetailsUseCase = new UserSubscriptionDetailsUseCase(
  userRepository,
  userSubscriptionRepository,
  paymentServiceAdapter
);

export const userController = new UserController(
  registerUserUseCase,
  verifyUserCredentialUseCase,
  verifyUserExistenceUseCase,
  requestPasswordResetUseCase,
  resetUserCredentialUseCase,
  requestOTPUseCase,
  verifyOTPUseCase,
  updateUserUseCase,
  subscriptionStatusUseCase,
  userSubscriptionDetailsUseCase,
  authService,
  authServiceMiddleware,
  commonHeaders,
  emailValidation,
  userValidation,
  verifyOTPValidation,
  userCredentialValidation,
  updateUserValidation
);
