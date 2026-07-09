import express from "express";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

const defaultApiResponseMessage = new APIResponseMessage(
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
);

export class InventoryCategoryController {
  constructor(
    fetchInventoryCategoriesUseCase,
    fetchInventoryCategoryUseCase,
    authServiceMiddleware,
    commonHeaders,
    inventoryCategoryValidation,
    inventoryCategoriesValidation
  ) {
    this.fetchInventoryCategoriesUseCase = fetchInventoryCategoriesUseCase;
    this.fetchInventoryCategoryUseCase = fetchInventoryCategoryUseCase;
    this.authServiceMiddleware = authServiceMiddleware;
    this.commonHeaders = commonHeaders;
    this.inventoryCategoryValidation = inventoryCategoryValidation;
    this.inventoryCategoriesValidation = inventoryCategoriesValidation;
  }

  async fetchInventoryCategories(req, res) {
    const userType = req.userType;
    const type = req.query.type;
    const userId = req.query.userid;
    const useCaseResponse = await this.fetchInventoryCategoriesUseCase.execute(
      type,
      userType,
      userId
    );

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async fetchInventoryCategory(req, res) {
    const categoryID = req.query.categoryID;
    const useCaseResponse = await this.fetchInventoryCategoryUseCase.execute(
      categoryID
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  createExpressController() {
    const router = new express.Router();
    router.get(
      "/inventoryCategories",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ALL_USERS_ACCESS
      ),
      this.inventoryCategoriesValidation.validate.bind(this),
      this.fetchInventoryCategories.bind(this)
    );
    router.get(
      "/inventoryCategory",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ALL_USERS_ACCESS
      ),
      this.inventoryCategoryValidation.validate.bind(this),
      this.fetchInventoryCategory.bind(this)
    );
    return router;
  }
}
