import { UserBodyMatrixController } from "../../adapters/express/controllers/UserBodyMatrixController.js";
import { UserRepository } from "../../adapters/database/repositories/UserRepository.js";
import { UserBodyMatrixRepository } from "../../adapters/database/repositories/UserBodyMatrixRepository.js";
import { CreateUserBodyMatrixUseCase } from "../../usecases/user/body_matrix/CreateUserBodyMatrix.js";
import { FetchUserBodyMatrixUseCase } from "../../usecases/user/body_matrix/FetchUserBodyMatrix.js";
import { UpdateUserBodyMatrixUseCase } from "../../usecases/user/body_matrix/UpdateUserBodyMarix.js";
import { DeleteUserBodyMatrixUseCase } from "../../usecases/user/body_matrix/DeleteUserBodyMatrix.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";

const userRepository = new UserRepository();
const userBodyMatrixRepository = new UserBodyMatrixRepository();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();

const createUserBodyMatrixUseCase = new CreateUserBodyMatrixUseCase(
  userRepository,
  userBodyMatrixRepository
);
const fetchUserBodyMatrixUseCase = new FetchUserBodyMatrixUseCase(
  userRepository,
  userBodyMatrixRepository
);
const updateUserBodyMatrixUseCase = new UpdateUserBodyMatrixUseCase(
  userRepository,
  userBodyMatrixRepository
);
const deleteUserBodyMatrixUseCase = new DeleteUserBodyMatrixUseCase(
  userRepository,
  userBodyMatrixRepository
);

export const userBodyMatrixController = new UserBodyMatrixController(
  createUserBodyMatrixUseCase,
  fetchUserBodyMatrixUseCase,
  updateUserBodyMatrixUseCase,
  deleteUserBodyMatrixUseCase,
  authServiceMiddleware,
  commonHeaders
);
