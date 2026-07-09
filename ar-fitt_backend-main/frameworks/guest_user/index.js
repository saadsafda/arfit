import { GuestUserController } from "../../adapters/express/controllers/GuestUserController.js";
import { UserRepository } from "../../adapters/database/repositories/UserRepository.js";
import { RegisterGuestUserUseCase } from "../../usecases/guest_user/RegisterGuestUser.js";
import { AuthService } from "../../middleware/authorization_service/usecases/AuthService.js";
import { Headers } from "../../middleware/common/headers.js";
import { GuestUserValidation } from "../../middleware/data_validation/GuestUserValidation.js";

const userRepository = new UserRepository();
const authService = new AuthService();
const commonHeaders = new Headers();
const guestUserValidation = new GuestUserValidation();

const registerGuestUseCase = new RegisterGuestUserUseCase(userRepository);

export const guestUserController = new GuestUserController(
  registerGuestUseCase,
  authService,
  commonHeaders,
  guestUserValidation
);
