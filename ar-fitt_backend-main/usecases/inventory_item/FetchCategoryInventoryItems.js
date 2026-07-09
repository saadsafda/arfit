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
  ) {
    this.inventoryItemRespository = inventoryItemRespository;
    this.invemtoryItemColorRepository = invemtoryItemColorRepository;
    this.inventoryItemImageURLRepository = inventoryItemImageURLRepository;
    this.inventoryItemSizeRepository = inventoryItemSizeRepository;
  }

  async execute(categoryID, userType, userIdentifier) {
    console.log("User IdentifierBackend:", userIdentifier);
    console.log("FetchCaegoryInventory", userIdentifier);
    
    // Get user's gender for filtering products
    const [userGender, genderError] = await this.inventoryItemRespository.getUserGenderByID(userIdentifier);
    console.log("User Gender:", userGender);
    
    // Retrieve the user's body image record to get recommended_shirts
    const [userBodyImage, userBodyError] =
      await this.inventoryItemRespository.getUserBodyImageByUserID(userIdentifier);

      console.log("Recommended Shirts Array:", userBodyImage);

    let recommendedShirtsArr = [];
    if (!userBodyError && userBodyImage) {
      const recommendedShirtsStr = userBodyImage.getRecommendedShirts();
      
      if (recommendedShirtsStr) {
        recommendedShirtsArr = recommendedShirtsStr.toString().split(",").map(s => s.trim());
      }
    }
    console.log("Recommended Shirts Array:", recommendedShirtsArr);

    var repoReturnedValues;
    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        repoReturnedValues =
          await this.inventoryItemRespository.getAllInventoryItems(categoryID, userGender);
        break;
      case CommonConstants.GUEST_USER_TYPE:
        repoReturnedValues =
          // await this.inventoryItemRespository.getAllDemoInventoryItems(categoryID);
          await this.inventoryItemRespository.getAllInventoryItems(categoryID, userGender);
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

    console.log("repoReturned1");
    console.log(repoReturnedValues);

    if (!repoReturnedValues[0] || repoReturnedValues[0].length === 0) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INVENTORY_ITEMS_NOT_EXIST_MESSAGE,
          APIResponseConstants.INVENTORY_ITEMS_NOT_EXIST_MESSAGE_CODE
        ),
        APIResponseConstants.ITEM_NOT_FOUND
      );
    }

    

    let inventoryItems = repoReturnedValues[0];

    console.log("repoReturned2");
    console.log(inventoryItems);

    // Filter inventory items: only include items whose id is in the recommendedShirtsArr
    if (recommendedShirtsArr.length > 0 && categoryID == '8c8d034c-cf5e-45a4-9cef-ca95c0274f27') {
      inventoryItems = inventoryItems.filter(item => recommendedShirtsArr.includes(item.getID()));
    }

    console.log("repoReturned3");
    console.log(inventoryItems);

    // if (categoryID !== '925ea5bc-06d1-47fb-p238-1b7a37ed0455') {

      // Attach additional details (colors, images, sizes) for each filtered item
      for (let i = 0; i < inventoryItems.length; i++) {

        
        repoReturnedValues =
          await this.invemtoryItemColorRepository.getInventoryItemAllColors(
            inventoryItems[i].getID()
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
        inventoryItems[i].setItemColors(repoReturnedValues[0]);

        repoReturnedValues =
          await this.inventoryItemImageURLRepository.getInventoryItemAllImagesURLs(
            inventoryItems[i].getID()
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
        inventoryItems[i].setItemImageURLs(repoReturnedValues[0]);

        if (categoryID != '925ea5bc-06d1-47fb-p238-1b7a37ed0455') {
          repoReturnedValues =
            await this.inventoryItemSizeRepository.getInventoryItemAllSizes(
              inventoryItems[i].getID()
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
          inventoryItems[i].setItemSizes(repoReturnedValues[0]);
        }
      }
    // }

    console.log("repoReturned4");
    console.log(inventoryItems);

    return new APIResponse(
      new APIResponseMessage(
        inventoryItems,
        APIResponseConstants.INVENTORY_ITEMS_EXIST_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
