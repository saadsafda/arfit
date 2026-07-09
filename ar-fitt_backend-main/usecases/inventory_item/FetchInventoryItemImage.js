import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";

export class FetchInventoryItemImageUseCase {
  constructor(inventoryItemImageRepository) {
    this.inventoryItemImageRepository = inventoryItemImageRepository;
  }

  async execute(itemID, imageURLID) {
    var repoReturnedValues =
      await this.inventoryItemImageRepository.getInventoryItemImage(
        itemID,
        imageURLID
      );
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
          APIResponseConstants.INVENTORY_ITEM_IMAGE_NOT_EXIST_MESSAGE,
          APIResponseConstants.INVENTORY_ITEM_IMAGE_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    return new APIResponse(
      new APIResponseMessage(
        repoReturnedValues[0],
        APIResponseConstants.INVENTORY_ITEM_IMAGE_EXIST_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
