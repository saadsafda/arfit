import { UserFaceMatrixController } from "../../adapters/express/controllers/UserFaceMatrixController.js";
import { UserRepository } from "../../adapters/database/repositories/UserRepository.js";
import { UserFaceMatrixRepository } from "../../adapters/database/repositories/UserFaceMatrixRepository.js";
import { CreateUserFaceMatrixUseCase } from "../../usecases/user/face_matrix/CreateUserFaceMatrix.js";
import { FetchUserFaceMatrixUseCase } from "../../usecases/user/face_matrix/FetchUserFaceMatrix.js";
import { UpdateUserFaceMatrixUseCase } from "../../usecases/user/face_matrix/UpdateUserFaceMatrix.js";
import { DeleteUserFaceMatrixUseCase } from "../../usecases/user/face_matrix/DeleteUserFaceMatrix.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";

const userRepository = new UserRepository();
const userFaceMatrixRepository = new UserFaceMatrixRepository();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();

const createUserFaceMatrixUseCase = new CreateUserFaceMatrixUseCase(
  userRepository,
  userFaceMatrixRepository
);
const fetchUserFaceMatrixUseCase = new FetchUserFaceMatrixUseCase(
  userRepository,
  userFaceMatrixRepository
);
const updateUserFaceMatrixUseCase = new UpdateUserFaceMatrixUseCase(
  userRepository,
  userFaceMatrixRepository
);
const deleteUserFaceMatrixUseCase = new DeleteUserFaceMatrixUseCase(
  userRepository,
  userFaceMatrixRepository
);

export const userFaceMatrixController = new UserFaceMatrixController(
  createUserFaceMatrixUseCase,
  fetchUserFaceMatrixUseCase,
  updateUserFaceMatrixUseCase,
  deleteUserFaceMatrixUseCase,
  authServiceMiddleware,
  commonHeaders
);
