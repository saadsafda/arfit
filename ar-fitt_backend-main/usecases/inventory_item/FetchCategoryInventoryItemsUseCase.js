import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../infra/utils/common/Constants.js";

export class FetchCategoryInventoryItemsUseCase {
  constructor(
    inventoryItemRespository,
    invemtoryItemColorRepository,
    inventoryItemImageURLRepository,
    inventoryItemSizeRepository,
    userBodyImageRepository // new dependency
  ) {
    this.inventoryItemRespository = inventoryItemRespository;
    this.invemtoryItemColorRepository = invemtoryItemColorRepository;
    this.inventoryItemImageURLRepository = inventoryItemImageURLRepository;
    this.inventoryItemSizeRepository = inventoryItemSizeRepository;
    this.userBodyImageRepository = userBodyImageRepository;
  }

  async execute(categoryID, userType, userIdentifier) {
    // Retrieve the user's body image record to get recommended_shirts

    console.log("User IdentifierBackend:", userIdentifier);
    const [userBodyImage, userBodyError] =
      await this.userBodyImageRepository.getUserBodyImageByUserID(userIdentifier);
    if (userBodyError || !userBodyImage) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INVENTORY_ITEMS_NOT_EXIST_MESSAGE,
          APIResponseConstants.INVENTORY_ITEMS_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }
    // Convert the recommended_shirts string to an array
    let recommendedShirtsArr = [];
    const recommendedShirtsStr = userBodyImage.getRecommendedShirts();
    if (recommendedShirtsStr) {
      recommendedShirtsArr = recommendedShirtsStr.split(",").map(s => s.trim());
    }

    // Debug: log the recommended shirts array and each inventory item id
    console.log("Recommended Shirts Array:", recommendedShirtsArr);

    // Get items by category (using different methods depending on user type)
    let repoReturnedValues;
    if (userType === CommonConstants.REGISTERED_USER_TYPE) {
      repoReturnedValues = await this.inventoryItemRespository.getAllInventoryItems(categoryID);
    } else if (userType === CommonConstants.GUEST_USER_TYPE) {
      repoReturnedValues = await this.inventoryItemRespository.getAllDemoInventoryItems(categoryID);
    } else {
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
    let inventoryItems = repoReturnedValues[0] || [];
    // Filter the inventory items: only include items whose id is in the recommendedShirtsArr
    if (recommendedShirtsArr.length > 0) {
      inventoryItems = inventoryItems.filter(item => recommendedShirtsArr.includes(item.getID()));
    }

    // Optionally: attach additional details (colors, images, sizes) for each item if needed.
    for (let i = 0; i < inventoryItems.length; i++) {
      repoReturnedValues =
        await this.invemtoryItemColorRepository.getInventoryItemAllColors(inventoryItems[i].getID());
      if (repoReturnedValues[1] != null) {
        return new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        );
      }
      inventoryItems[i].setItemColors(repoReturnedValues[0]);

      repoReturnedValues =
        await this.inventoryItemImageURLRepository.getInventoryItemAllImagesURLs(inventoryItems[i].getID());
      if (repoReturnedValues[1] != null) {
        return new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        );
      }
      inventoryItems[i].setItemImageURLs(repoReturnedValues[0]);

      repoReturnedValues =
        await this.inventoryItemSizeRepository.getInventoryItemAllSizes(inventoryItems[i].getID());
      if (repoReturnedValues[1] != null) {
        return new APIResponse(
          new APIResponseMessage(
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
            APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
          ),
          APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
        );
      }
      inventoryItems[i].setItemSizes(repoReturnedValues[0]);
    }

    if (inventoryItems.length === 0) {
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