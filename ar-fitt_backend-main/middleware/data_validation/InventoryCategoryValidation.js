import Joi from "joi";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

const inventoryCategorySchema = Joi.object({
  categoryID: Joi.string().required(),
});

export class InventoryCategoryValidation {
  validate(req, res, next) {
    const categoryID = req.query.categoryID;
    const validationResult = inventoryCategorySchema.validate({ categoryID });
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
