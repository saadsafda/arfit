import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { UserFaceMatrix } from "../../../entities/UserFaceMatrix.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class CreateUserFaceMatrixUseCase {
  constructor(userRepository, userFaceMatrixRepository) {
    this.userRepository = userRepository;
    this.userFaceMatrixRepository = userFaceMatrixRepository;
  }

  async execute(userEmail, faceMatrix) {
    let repoReturnedValues = await this.userRepository.getUserByEmail(
      userEmail
    );
    const existingUser = repoReturnedValues[0];
    if (repoReturnedValues[1] != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    if (!existingUser) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    if (existingUser.getIsFaceScanned()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_FACE_MATRIX_ALREADY_EXIST_MESSAGE,
          APIResponseConstants.USER_FACE_MATRIX_ALREADY_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.CONFLICTED_REQUEST
      );
    }

    const currentDateTime = new Date().toISOString();
    const userFaceMatrix = new UserFaceMatrix(
      existingUser.getID(),
      faceMatrix,
      currentDateTime,
      currentDateTime
    );
    repoReturnedValues =
      await this.userFaceMatrixRepository.createUserFaceMatrix(userFaceMatrix);
    if (repoReturnedValues != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    repoReturnedValues = await this.userRepository.markUserFaceScannedByEmail(
      userEmail
    );
    if (repoReturnedValues != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    return new APIResponse(
      new APIResponseMessage(
        APIResponseConstants.USER_FACE_MATRIX_CREATED_MESSAGE,
        APIResponseConstants.USER_FACE_MATRIX_CREATED_MESSAGE_CODE
      ),
      APIResponseConstants.ITEM_CREATED_STATUS_CODE
    );
  }
}
