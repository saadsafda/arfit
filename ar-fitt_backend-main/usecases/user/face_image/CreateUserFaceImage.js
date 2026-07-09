import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { UserFaceImage } from "../../../entities/UserFaceImage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

export class CreateUserFaceImageUseCase {
  constructor(userRepository, userFaceImageRepository) {
    this.userRepository = userRepository;
    this.userFaceImageRepository = userFaceImageRepository;
  }

  async execute(userIdentifier, faceImage, userType) {
    var repoReturnedValues;

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        repoReturnedValues = await this.userRepository.getUserByEmail(
          userIdentifier
        );
        break;
      case CommonConstants.GUEST_USER_TYPE:
        repoReturnedValues = await this.userRepository.getUserByID(
          userIdentifier
        );
        break;
      default:
        return new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        );
    }

    if (repoReturnedValues[1] != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }
    if (!repoReturnedValues[0]) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    const existingUser = repoReturnedValues[0];

    if (existingUser.getIsFaceScanned()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_FACE_IMAGE_ALREADY_EXIST_MESSAGE,
          APIResponseConstants.USER_FACE_IMAGE_ALREADY_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.CONFLICTED_REQUEST
      );
    }

    const currentDateTime = new Date().toISOString();
    const userFaceImage = new UserFaceImage(
      existingUser.getID(),
      faceImage,
      currentDateTime,
      currentDateTime
    );

    repoReturnedValues = await this.userFaceImageRepository.createUserFaceImage(
      userFaceImage
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

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        repoReturnedValues =
          await this.userRepository.markUserFaceScannedByEmail(userIdentifier);
        break;
      case CommonConstants.GUEST_USER_TYPE:
        repoReturnedValues = await this.userRepository.markUserFaceScannedByID(
          userIdentifier
        );
        break;
      default:
        return new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        );
    }

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
        APIResponseConstants.USER_FACE_IMAGE_CREATED_MESSAGE,
        APIResponseConstants.USER_FACE_IMAGE_CREATED_MESSAGE_CODE
      ),
      APIResponseConstants.ITEM_CREATED_STATUS_CODE
    );
  }
}
