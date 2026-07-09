import Joi from "joi";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

const userIDValidation = Joi.object({
  userID: Joi.string().required(),
});

export class UserIDValidation {
  validate(req, res, next) {
    const userID = req.params.userID;
    const validationResult = userIDValidation.validate({ userID });
    if (validationResult.error) {
      return res
        .status(APIResponseConstants.BAD_REQUEST)
        .send(
          JSON.stringify(
            new APIResponseMessage(
              validationResult.error,
              APIResponseConstants.INVALID_DATA_IN_REQUEST
            )
          )
        );
    }
    next();
  }
}
