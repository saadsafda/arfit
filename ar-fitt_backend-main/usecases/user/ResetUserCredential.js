import crypto from "crypto";
import { UserCredential } from "../../entities/UserCredential.js";
import { APIResponse } from "../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../infra/utils/api_response/APIResponseConstants.js";

export class ResetUserCredentialUseCase {
  constructor(userCredentialRepository) {
    this.userCredentialRepository = userCredentialRepository;
  }

  async execute(email, password) {
    var currentDateTime = new Date().toISOString();
    var newUserCredential = new UserCredential(
      email,
      crypto.createHash("sha1").update(password).digest("hex"),
      null,
      currentDateTime
    );
    const repoError = await this.userCredentialRepository.updateUserCredential(
      newUserCredential
    );
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
        APIResponseConstants.USER_CREDENTIAL_SUCCESSFUL_RESET_MESSAGE,
        APIResponseConstants.USER_CREDENTIAL_SUCCESSFUL_RESET_MESSAGE_CODE
      ),
      APIResponseConstants.SUCCESS_STATUS_CODE
    );
  }
}
