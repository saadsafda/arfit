import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { UserBodyMatrix } from "../../../entities/UserBodyMatrix.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class CreateUserBodyMatrixUseCase {
  constructor(userRepository, userBodyMatrixRepository) {
    this.userRepository = userRepository;
    this.userBodyMatrixRepository = userBodyMatrixRepository;
  }

  async execute(userEmail, bodyMatrix) {
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

    if (existingUser.getIsBodyScanned()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_BODY_MATRIX_ALREADY_EXIST_MESSAGE,
          APIResponseConstants.USER_BODY_MATRIX_ALREADY_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.CONFLICTED_REQUEST
      );
    }

    const currentDateTime = new Date().toISOString();
    const userBodyMatrix = new UserBodyMatrix(
      existingUser.getID(),
      bodyMatrix,
      currentDateTime,
      currentDateTime
    );
    repoReturnedValues =
      await this.userBodyMatrixRepository.createUserBodyMatrix(userBodyMatrix);
    if (repoReturnedValues != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    repoReturnedValues = await this.userRepository.markUserBodyScannedByEmail(
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
        APIResponseConstants.USER_BODY_MATRIX_CREATED_MESSAGE,
        APIResponseConstants.USER_BODY_MATRIX_CREATED_MESSAGE_CODE
      ),
      APIResponseConstants.ITEM_CREATED_STATUS_CODE
    );
  }
}
