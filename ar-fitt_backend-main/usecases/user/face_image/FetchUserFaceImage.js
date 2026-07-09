import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class FetchUserFaceImageUseCase {
  constructor(userFaceImageRepository) {
    this.userFaceImageRepository = userFaceImageRepository;
  }

  async execute(userID) {
    const repoReturnedValues =
      await this.userFaceImageRepository.getUserFaceImageByUserID(userID);
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
          APIResponseConstants.USER_FACE_IMAGE_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_FACE_IMAGE_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    var userFaceImage = repoReturnedValues[0];
    var base64Image = userFaceImage.getFaceImage().split(",");
    if (base64Image.length > 1) {
      base64Image = base64Image[1];
    } else {
      base64Image = base64Image[0];
    }

    userFaceImage.setFaceImage(Buffer.from(base64Image, "base64"));

    return new APIResponse(
      new APIResponseMessage(
        userFaceImage,
        APIResponseConstants.USER_FACE_IMAGE_EXIST_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
