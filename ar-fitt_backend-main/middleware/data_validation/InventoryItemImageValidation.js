import Joi from "joi";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

const inventoryItemImageSchema = Joi.object({
  itemID: Joi.string().invalid(":itemID").required(),
  imageURLID: Joi.string().not(":imageURLID").required(),
});

export class InventoryItemImageValidation {
  validate(req, res, next) {
    var itemID = String(req.params.itemID);
    var imageURLID = String(req.params.imageURLID);
    const validationResult = inventoryItemImageSchema.validate(
      { itemID, imageURLID },
      { abortEarly: false }
    );
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
