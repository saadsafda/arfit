import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";

export class FetchInventoryItemsUseCase {
  constructor(
    inventoryItemRespository,
    invemtoryItemColorRepository,
    inventoryItemImageURLRepository,
    inventoryItemSizeRepository
  ) {
    this.inventoryItemRespository = inventoryItemRespository;
    this.invemtoryItemColorRepository = invemtoryItemColorRepository;
    this.inventoryItemImageURLRepository = inventoryItemImageURLRepository;
    this.inventoryItemSizeRepository = inventoryItemSizeRepository;
  }

  async execute(itemIDs) {
    var inventoryItems = [];

    for (var i = 0; i < itemIDs.length; i++) {
      var repoReturnedValues =
        await this.inventoryItemRespository.getInventoryItem(itemIDs[i]);
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
        continue;
      }
      var inventoryItem = repoReturnedValues[0];
      const itemID = inventoryItem.getID();

      repoReturnedValues =
        await this.invemtoryItemColorRepository.getInventoryItemAllColors(
          itemID
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
      inventoryItem.setItemColors(repoReturnedValues[0]);

      repoReturnedValues =
        await this.inventoryItemImageURLRepository.getInventoryItemAllImagesURLs(
          itemID
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
      inventoryItem.setItemImageURLs(repoReturnedValues[0]);

      repoReturnedValues =
        await this.inventoryItemSizeRepository.getInventoryItemAllSizes(itemID);
      if (repoReturnedValues[1] != null) {
        return new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        );
      }
      inventoryItem.setItemSizes(repoReturnedValues[0]);

      inventoryItems.push(inventoryItem);
    }

    if (inventoryItems.length == 0) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INVENTORY_ITEMS_NOT_EXIST_MESSAGE,
          APIResponseConstants.INVENTORY_ITEMS_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    return new APIResponse(
      new APIResponseMessage(
        inventoryItems,
        APIResponseConstants.INVENTORY_ITEMS_EXIST_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
