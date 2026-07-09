import Joi from "joi";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

const inventoryCategoriesSchema = Joi.object({
  type: Joi.string().when({
    is: Joi.string().empty(""),
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
});

export class InventoryCategoriesValidation {
  validate(req, res, next) {
    const type = req.query.type;
    const validationResult = inventoryCategoriesSchema.validate({ type });
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
