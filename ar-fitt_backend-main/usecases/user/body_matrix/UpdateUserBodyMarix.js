import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { UserBodyMatrix } from "../../../entities/UserBodyMatrix.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class UpdateUserBodyMatrixUseCase {
  constructor(userRepository, userBodyMatrixRepository) {
    this.userRepository = userRepository;
    this.userBodyMatrixRepository = userBodyMatrixRepository;
  }

  async execute(userEmail, userBodyMatrix) {
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

    if (!existingUser.getIsBodyScanned()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_BODY_MATRIX_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_BODY_MATRIX_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    const existingUserBodyMatrix = new UserBodyMatrix(
      existingUser.getID(),
      userBodyMatrix,
      null,
      new Date().toISOString()
    );

    repoReturnedValues =
      await this.userBodyMatrixRepository.updateUserBodyMatrix(
        existingUserBodyMatrix
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
        APIResponseConstants.USER_BODY_MATRIX_UPDATED_MESSAGE,
        APIResponseConstants.USER_BODY_MATRIX_UPDATED_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
