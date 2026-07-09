import express from "express";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

const defaultApiResponseMessage = new APIResponseMessage(
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
);

export class UserController {
  constructor(
    registerUserUseCase,
    verifyUserCredentialUseCase,
    verifyUserExistenceUseCase,
    requestPasswordResetUseCase,
    resetUserCredentialUseCase,
    requestOTPUseCase,
    verifyOTPUseCase,
    updateUserUseCase,
    subscriptionStatusUseCase,
    userSubscriptionDetailsUseCase,
    authService,
    authServiceMiddleware,
    commonHeaders,
    emailValidation,
    userValidation,
    verifyOTPValidation,
    userCredentialValidation,
    updateUserValidation
  ) {
    this.registerUserUseCase = registerUserUseCase;
    this.verifyUserCredentialUseCase = verifyUserCredentialUseCase;
    this.verifyUserExistenceUseCase = verifyUserExistenceUseCase;
    this.requestPasswordResetUseCase = requestPasswordResetUseCase;
    this.resetUserCredentialUseCase = resetUserCredentialUseCase;
    this.requestOTPUseCase = requestOTPUseCase;
    this.verifyOTPUseCase = verifyOTPUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.subscriptionStatusUseCase = subscriptionStatusUseCase;
    this.userSubscriptionDetailsUseCase = userSubscriptionDetailsUseCase;
    this.authService = authService;
    this.authServiceMiddleware = authServiceMiddleware;
    this.commonHeaders = commonHeaders;
    this.emailValidation = emailValidation;
    this.userValidation = userValidation;
    this.verifyOTPValidation = verifyOTPValidation;
    this.userCredentialValidation = userCredentialValidation;
    this.updateUserValidation = updateUserValidation;
  }

  async registerUser(req, res) {
    const { email, firstName, lastName, phone, password, gender, dob } =
      req.body;

    const userExists = await this.verifyUserExistenceUseCase.execute(email);

    if (
      userExists.getResponseMessage().getMessageCode() ==
      APIResponseConstants.USER_EXIST_MESSAGE_CODE
    ) {
      res
        .status(APIResponseConstants.CONFLICTED_REQUEST)
        .send(JSON.stringify(userExists.getResponseMessage()));
      return;
    }

    const useCaseResponse = await this.registerUserUseCase.execute(
      email,
      firstName,
      lastName,
      phone,
      password,
      gender,
      dob
    );

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    if (
      useCaseResponse.getResponseMessage().getMessageCode() !=
      APIResponseConstants.USER_REGISTERED_MESSAGE_CODE
    ) {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
      return;
    }

    const clientType = req.headers[CommonConstants.CLIENT_TYPE];

    const token = this.authService.generateToken(
      useCaseResponse.getResponseMessage().getMessage().getID(),
      clientType,
      CommonConstants.REGISTERED_USER_TYPE
    );
    if (token == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    switch (clientType) {
      case CommonConstants.CLIENT_TYPE_WEB:
        res.set(CommonConstants.ACCESS_TOKEN, token);
        break;
      case CommonConstants.CLIENT_TYPE_MOBILE:
        res.set(CommonConstants.ACCESS_TOKEN, token[0]);
        res.set(CommonConstants.REFRESH_TOKEN, token[1]);
        break;
      default:
        res.set(CommonConstants.ACCESS_TOKEN, token);
        break;
    }

    console.log("after register response");
    console.log(useCaseResponse.getResponseMessage());

    res
      .status(useCaseResponse.getStatusCode())
      .send(JSON.stringify(useCaseResponse.getResponseMessage()));
  }

  async verifyUserCredential(req, res) {
    const { email, password } = req.body;
    const useCaseResponse = await this.verifyUserCredentialUseCase.execute(
      email,
      password
    );

    

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    }

    if (
      useCaseResponse.getResponseMessage().getMessageCode() !=
      APIResponseConstants.USER_EXIST_MESSAGE_CODE
    ) {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
      return;
    }

    const clientType = req.headers[CommonConstants.CLIENT_TYPE];
    
    // Check user role to determine token type
    const user = useCaseResponse.getResponseMessage().getMessage();
    const userRole = user.getRole();
    let userType;
    
    if (userRole === "admin") {
      userType = CommonConstants.ADMIN_USER_TYPE;
    } else {
      userType = CommonConstants.REGISTERED_USER_TYPE;
    }

    const token = this.authService.generateToken(
      user.getID(),
      clientType,
      userType
    );
    if (token == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    switch (clientType) {
      case CommonConstants.CLIENT_TYPE_WEB:
        res.set(CommonConstants.ACCESS_TOKEN, token);
        break;
      case CommonConstants.CLIENT_TYPE_MOBILE:
        res.set(CommonConstants.ACCESS_TOKEN, token[0]);
        res.set(CommonConstants.REFRESH_TOKEN, token[1]);
        break;
      default:
        res.set(CommonConstants.ACCESS_TOKEN, token);
        break;
    }

    console.log("after login response");
    console.log(useCaseResponse.getResponseMessage());

    res
      .status(useCaseResponse.getStatusCode())
      .send(JSON.stringify(useCaseResponse.getResponseMessage()));
  }

  async verifyUserExistence(req, res) {
    const email = req.query.email;
    const useCaseResponse = await this.verifyUserExistenceUseCase.execute(
      email
    );

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async requestPasswordReset(req, res) {
    const email = req.query.email;

    const userExists = await this.verifyUserExistenceUseCase.execute(email);

    if (
      userExists.getResponseMessage().getMessageCode() ==
      APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
    ) {
      res
        .status(userExists.getStatusCode())
        .send(JSON.stringify(userExists.getResponseMessage()));
      return;
    }

    const useCaseResponse = await this.requestPasswordResetUseCase.execute(
      email
    );

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async resetUserCredential(req, res) {
    const { email, password } = req.body;

    const userExists = await this.verifyUserExistenceUseCase.execute(email);

    if (
      userExists.getResponseMessage().getMessageCode() ==
      APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
    ) {
      res
        .status(userExists.getStatusCode())
        .send(JSON.stringify(userExists.getResponseMessage()));
      return;
    }

    const useCaseResponse = await this.resetUserCredentialUseCase.execute(
      email,
      password
    );

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async requestOTP(req, res) {
    const email = req.query.email;

    const userExists = await this.verifyUserExistenceUseCase.execute(email);
    if (
      userExists.getResponseMessage().getMessageCode() ==
      APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
    ) {
      res
        .status(userExists.getStatusCode())
        .send(JSON.stringify(userExists.getResponseMessage()));
      return;
    }

    const useCaseResponse = await this.requestOTPUseCase.execute(email);

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async verifyOTP(req, res) {
    const { email, otp } = req.body;

    const userExists = await this.verifyUserExistenceUseCase.execute(email);
    if (
      userExists.getResponseMessage().getMessageCode() ==
      APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
    ) {
      res
        .status(userExists.getStatusCode())
        .send(JSON.stringify(userExists.getResponseMessage()));
      return;
    }

    const useCaseResponse = await this.verifyOTPUseCase.execute(email, otp);

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async updateUser(req, res) {
    const { email, firstName, lastName, phone, gender, dob } = req.body;

    const userExists = await this.verifyUserExistenceUseCase.execute(email);

    if (
      userExists.getResponseMessage().getMessageCode() ==
      APIResponseConstants.USER_NOT_EXIST_MESSAGE_CODE
    ) {
      res
        .status(userExists.getStatusCode())
        .send(JSON.stringify(userExists.getResponseMessage()));
      return;
    }

    const useCaseResponse = await this.updateUserUseCase.execute(
      email,
      firstName,
      lastName,
      phone,
      gender,
      dob
    );

    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async subscriptionStatus(req, res) {
    const email = req.query.email;
    const sessionID = req.query.session_id;

    const useCaseResponse = await this.subscriptionStatusUseCase.execute(email, sessionID);
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  async userSubscriptionDetails(req, res) {
    const email = req.query.email;

    const useCaseResponse = await this.userSubscriptionDetailsUseCase.execute(
      email
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(useCaseResponse.getResponseMessage()));
    }
  }

  createExpressController() {
    const router = new express.Router();
    router.post(
      "/user/signUp",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.userValidation.validate.bind(this),
      this.registerUser.bind(this)
    );
    router.post(
      "/user/login",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.userCredentialValidation.validate.bind(this),
      this.verifyUserCredential.bind(this)
    );
    router.get(
      "/user/userExists",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.emailValidation.validate.bind(this),
      this.verifyUserExistence.bind(this)
    );
    router.get(
      "/user/forgetPassword",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.emailValidation.validate.bind(this),
      this.requestPasswordReset.bind(this)
    );
    router.post(
      "/user/resetPassword",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.userCredentialValidation.validate.bind(this),
      this.resetUserCredential.bind(this)
    );
    router.get(
      "/user/requestOTP",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.emailValidation.validate.bind(this),
      this.requestOTP.bind(this)
    );
    router.post(
      "/user/verifyOTP",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.verifyOTPValidation.validate.bind(this),
      this.verifyOTP.bind(this)
    );
    router.post(
      "/user/updateUser",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.updateUserValidation.validate.bind(this),
      this.updateUser.bind(this)
    );
    router.get(
      "/user/subscriptionStatus",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.emailValidation.validate.bind(this),
      this.subscriptionStatus.bind(this)
    );
    router.get(
      "/user/subscription",
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ONLY_REGISTERED_USER_ACCESS
      ),
      this.emailValidation.validate.bind(this),
      this.userSubscriptionDetails.bind(this)
    );
    return router;
  }
}
