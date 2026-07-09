import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";

export class FetchUserBodyImageUseCase {
  constructor(userBodyImageRepository) {
    this.userBodyImageRepository = userBodyImageRepository;
  }

  async execute(userID) {
    const repoReturnedValues =
      await this.userBodyImageRepository.getUserBodyImageByUserID(userID);
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
          APIResponseConstants.USER_BODY_IMAGE_NOT_EXIST_MESSAGE,
          APIResponseConstants.USER_BODY_IMAGE_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    var userBodyImage = repoReturnedValues[0];
    var base64Image = userBodyImage.getBodyImage().split(",");
    if (base64Image.length > 1) {
      base64Image = base64Image[1];
    } else {
      base64Image = base64Image[0];
    }

    userBodyImage.setBodyImage(Buffer.from(base64Image, "base64"));

    return new APIResponse(
      new APIResponseMessage(
        userBodyImage,
        APIResponseConstants.USER_BODY_IMAGE_EXIST_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
