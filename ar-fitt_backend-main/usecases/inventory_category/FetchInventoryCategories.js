import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../infra/utils/common/Constants.js";

export class FetchInventoryCategoriesUseCase {
  constructor(inventoryCategoryRepository) {
    this.inventoryCategoryRepository = inventoryCategoryRepository;
  }

  async execute(type, userType, userId) {
    var repoReturnedValues;

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        repoReturnedValues =
          await this.inventoryCategoryRepository.getAllInventoryCategories(
            type,
            userId
          );
        break;
      case CommonConstants.GUEST_USER_TYPE:
        repoReturnedValues =
          await this.inventoryCategoryRepository.getAllInventoryCategories(
            type,
            userId
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
    if (!repoReturnedValues[0] || repoReturnedValues[0].length == 0) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INVENTORY_CATEGORIES_NOT_EXIST_MESSAGE,
          APIResponseConstants.INVENTORY_CATEGORIES_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    return new APIResponse(
      new APIResponseMessage(
        repoReturnedValues[0],
        APIResponseConstants.INVENTORY_CATEGORY_EXIST_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
