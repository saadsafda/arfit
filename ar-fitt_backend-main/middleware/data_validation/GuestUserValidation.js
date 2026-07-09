import Joi from "joi";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";

const guestUserSchema = Joi.object({
  gender: Joi.string().required(),
  dob: Joi.string().isoDate().required(),
});

export class GuestUserValidation {
  validate(req, res, next) {
    const { gender, dob } = req.body;
    const validationResult = guestUserSchema.validate(
      { gender, dob },
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
