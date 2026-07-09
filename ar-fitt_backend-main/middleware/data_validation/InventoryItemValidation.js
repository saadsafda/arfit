import Joi from "joi";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

const inventoryItemSchema = Joi.object({
  itemIDs: Joi.array().min(1).required(),
});

export class InventoryItemValidation {
  validate(req, res, next) {
    const { itemIDs } = req.body;
    const validationResult = inventoryItemSchema.validate({ itemIDs });
    if (validationResult.error) {
      return res
        .status(APIResponseConstants.BAD_REQUEST)
        .send(
          new APIResponseMessage(
            validationResult.error,
            APIResponseConstants.INVALID_DATA_IN_REQUEST
          )
        );
    }
    next();
  }
}
