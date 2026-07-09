import { InventoryCategoryController } from "../../adapters/express/controllers/InventoryCategoryController.js";
import { InventoryCategoryRepository } from "../../adapters/database/repositories/InventoryCategoryRepository.js";
import { FetchInventoryCategoriesUseCase } from "../../usecases/inventory_category/FetchInventoryCategories.js";
import { FetchInventoryCategoryUseCase } from "../../usecases/inventory_category/FetchInventoryCategory.js";
import { AuthServiceMiddleware } from "../../middleware/authorization_service/usecases/AuthServiceMiddleware.js";
import { Headers } from "../../middleware/common/headers.js";
import { InventoryCategoryValidation } from "../../middleware/data_validation/InventoryCategoryValidation.js";
import { InventoryCategoriesValidation } from "../../middleware/data_validation/InventoryCategoriesValidation.js";

const inventoryCategoryRepository = new InventoryCategoryRepository();
const authServiceMiddleware = new AuthServiceMiddleware();
const commonHeaders = new Headers();
const inventoryCategoryValidation = new InventoryCategoryValidation();
const inventoryCategoriesValidation = new InventoryCategoriesValidation();

const fetchInventoryCategoriesUseCase = new FetchInventoryCategoriesUseCase(
  inventoryCategoryRepository
);

const fetchInventoryCategoryUseCase = new FetchInventoryCategoryUseCase(
  inventoryCategoryRepository
);

export const inventoryCategoryController = new InventoryCategoryController(
  fetchInventoryCategoriesUseCase,
  fetchInventoryCategoryUseCase,
  authServiceMiddleware,
  commonHeaders,
  inventoryCategoryValidation,
  inventoryCategoriesValidation
);
