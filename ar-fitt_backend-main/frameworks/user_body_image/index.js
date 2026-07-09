import { UserBodyImageController } from "../../adapters/express/controllers/UserBodyImageController.js";
import { UserRepository } from "../../adapters/database/repositories/UserRepository.js";
import { UserBodyImageRepository } from "../../adapters/database/repositories/UserBodyImageRepository.js";
import { CreateUserBodyImageUseCase } from "../../usecases/user/body_image/CreateUserBodyImage.js";
import { FetchUserBodyImageUseCase } from "../../usecases/user/body_image/FetchUserBodyImage.js";
import { UpdateUserBodyImageUseCase } from "../../usecases/user/body_image/UpdateUserBodyImage.js";
import { DeleteUserBodyImageUseCase } from "../../usecases/user/body_image/DeleteUserBodyImage.js";
import { FetchUserBodyImageURLUseCase } from "../../usecases/user/body_image/FetchUserBodyImageURL.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";
import { CreateUserBodyImageValidation } from "../../middleware/data_validation/CreateUserBodyImageValidation.js";
import { FetchUserImageURLValidation } from "../../middleware/data_validation/FetchUserImageURLValidation.js";

const userRepository = new UserRepository();
const userBodyImageRepository = new UserBodyImageRepository();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();
const createUserBodyImageValidation = new CreateUserBodyImageValidation();
const fetchUserImageURLValidation = new FetchUserImageURLValidation();

const createUserBodyImageUseCase = new CreateUserBodyImageUseCase(
  userRepository,
  userBodyImageRepository
);
const fetchUserBodyImageUseCase = new FetchUserBodyImageUseCase(
  userBodyImageRepository
);
const updateUserBodyImageUseCase = new UpdateUserBodyImageUseCase(
  userRepository,
  userBodyImageRepository
);
const deleteUserBodyImageUseCase = new DeleteUserBodyImageUseCase(
  userRepository,
  userBodyImageRepository
);
const fetchUserBodyImageURLUseCase = new FetchUserBodyImageURLUseCase(
  userRepository,
  userBodyImageRepository
);

export const userBodyImageController = new UserBodyImageController(
  createUserBodyImageUseCase,
  fetchUserBodyImageUseCase,
  updateUserBodyImageUseCase,
  deleteUserBodyImageUseCase,
  fetchUserBodyImageURLUseCase,
  authServiceMiddleware,
  commonHeaders,
  createUserBodyImageValidation,
  fetchUserImageURLValidation
);
