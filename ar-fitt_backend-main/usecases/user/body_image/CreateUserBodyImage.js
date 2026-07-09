import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { UserBodyImage } from "../../../entities/UserBodyImage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

export class CreateUserBodyImageUseCase {
  constructor(userRepository, userBodyImageRepository) {
    this.userRepository = userRepository;
    this.userBodyImageRepository = userBodyImageRepository;
  }

  // Added optional parameters: size, recommendedColors, recommendedShirts defaulting to null
  async execute(userIdentifier, bodyImage, userType, recommendedsize = null, recommendedColors = null, recommendedShirts = null) {
    var repoReturnedValues;

    console.log("recommendedColors", recommendedsize);

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        repoReturnedValues = await this.userRepository.getUserByEmail(
          userIdentifier
        );
        break;
      case CommonConstants.GUEST_USER_TYPE:
        repoReturnedValues = await this.userRepository.getUserByEmail(
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

    console.log("CreateUserBodyImage.js");
    console.log(repoReturnedValues);
    console.log( userIdentifier + "@example.com")

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

    if (existingUser.getIsBodyScanned()) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.USER_BODY_IMAGE_ALREADY_EXIST_MESSAGE,
          APIResponseConstants.USER_BODY_IMAGE_ALREADY_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.CONFLICTED_REQUEST
      );
    }

    const currentDateTime = new Date().toISOString();
    const userBodyImage = new UserBodyImage(
      existingUser.getID(),
      bodyImage,
      recommendedsize,
      recommendedColors,
      recommendedShirts
      
    );

    console.log("CreateUserBodyImage.js");
    console.log("Recomonded Size", recommendedsize);
    console.log("Recomonded Colors", recommendedColors);
    console.log("Recomonded Shirts", recommendedShirts);

    repoReturnedValues = await this.userBodyImageRepository.createUserBodyImage(
      userBodyImage
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
          await this.userRepository.markUserBodyScannedByEmail(userIdentifier);
        break;
      case CommonConstants.GUEST_USER_TYPE:
        repoReturnedValues = await this.userRepository.markUserBodyScannedByEmail(
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


    console.log("CreateUserBodyImage.js2 ");
    console.log(repoReturnedValues);
    console.log( userIdentifier + "@example.com")


    

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
        APIResponseConstants.USER_BODY_IMAGE_CREATED_MESSAGE,
        APIResponseConstants.USER_BODY_IMAGE_CREATED_MESSAGE_CODE
      ),
      APIResponseConstants.ITEM_CREATED_STATUS_CODE
    );
  }
}
