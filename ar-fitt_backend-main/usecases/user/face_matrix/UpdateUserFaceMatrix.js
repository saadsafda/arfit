import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { UserFaceMatrix } from "../../../entities/UserFaceMatrix.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class UpdateUserFaceMatrixUseCase {
  constructor(userRepository, userFaceMatrixRepository) {
    this.userRepository = userRepository;
    this.userFaceMatrixRepository = userFaceMatrixRepository;
  }

  async execute(userEmail, userFaceMatrix) {
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

    if (!existingUser.getIsFaceScanned()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_FACE_MATRIX_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_FACE_MATRIX_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    const existingUserFaceMatrix = new UserFaceMatrix(
      existingUser.getID(),
      userFaceMatrix,
      null,
      new Date().toISOString()
    );

    repoReturnedValues =
      await this.userFaceMatrixRepository.updateUserFaceMatrix(
        existingUserFaceMatrix
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
        APIResponseConstants.USER_FACE_MATRIX_UPDATED_MESSAGE,
        APIResponseConstants.USER_FACE_MATRIX_UPDATED_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
