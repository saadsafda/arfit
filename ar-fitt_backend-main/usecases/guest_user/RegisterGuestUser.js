import { v4 } from "uuid";
import { User } from "../../entities/User.js";
import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";

export class RegisterGuestUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(gender, dob) {
    const currentDateTime = new Date().toISOString();
    const userDOB = new Date(dob);
    var userid = v4();

    const newGuestUser = new User(
      userid,
      userid + "@example.com",
      "User" + Math.floor(Math.random() * 1000),
      "Test" + Math.floor(Math.random() * 1000),
      "123-456-" + Math.floor(1000 + Math.random() * 9000),
      currentDateTime,
      currentDateTime,
      gender,
      userDOB,
      true,
      true,
      false,
      false,
      "user"
    );
    
    // const newGuestUser = new User(
    //   v4(),
    //   null,
    //   null,
    //   null,
    //   null,
    //   currentDateTime,
    //   currentDateTime,
    //   gender,
    //   userDOB,
    //   false,
    //   false,
    //   false,
    //   false
    // );

    const repoError = await this.userRepository.createUser(newGuestUser);
    if (repoError != null) {
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
        newGuestUser,
        APIResponseConstants.GUEST_USER_REGISTERED_MESSAGE_CODE
      ),
      APIResponseConstants.ITEM_CREATED_STATUS_CODE
    );
  }
}
