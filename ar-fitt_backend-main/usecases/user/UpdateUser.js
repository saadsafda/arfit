import { User } from "../../entities/User.js";
import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";

export class UpdateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, firstName, lastName, phone, gender, dob) {
    let modifiedAt = new Date().toISOString();
    const updatedUser = new User(
      null,
      email,
      firstName,
      lastName,
      phone,
      null,
      modifiedAt,
      gender,
      dob,
      null,
      null,
      null,
      null,
      null
    );

    const updateError = await this.userRepository.updateUserByEmail(
      updatedUser
    );
    if (updateError != null) {
      return new APIResponse(
        new APIResponseMessage(
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
          APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
        ),
        APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE
      );
    }

    return new APIResponse(
      new APIResponseMessage(
        APIResponseConstants.USER_UPDATED_MESSAGE,
        APIResponseConstants.USER_UPDATED_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
