import express from "express";
import util from "util";
import bodyParser from "body-parser";
import { fileTypeFromBuffer } from "file-type";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";

import { PrismaClient } from "@prisma/client";
import { User } from "../../../entities/User.js";

import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { getRecommendations } from "../../../infra/services/RecommendationService.js";

const prisma = new PrismaClient();

const defaultApiResponseMessage = new APIResponseMessage(
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  APIResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE_CODE
);
const invalidTokenResponse = new APIResponseMessage(
  APIResponseConstants.INVALID_TOKEN_MESSAGE,
  APIResponseConstants.INVALID_TOKEN_CODE
);



export class UserBodyImageController {
  constructor(
    createUserBodyImageUseCase,
    fetchUserBodyImageUseCase,
    updateUserBodyImageUseCase,
    deleteUserBodyImageUseCase,
    fetchUserBodyImageURLUseCase,
    authServiceMiddleware,
    commonHeaders,
    createUserBodyImageValidation,
    fetchUserImageURLValidation,
    userRepository
  ) {
    this.createUserBodyImageUseCase = createUserBodyImageUseCase;
    this.fetchUserBodyImageUseCase = fetchUserBodyImageUseCase;
    this.updateUserBodyImageUseCase = updateUserBodyImageUseCase;
    this.deleteUserBodyImageUseCase = deleteUserBodyImageUseCase;
    this.fetchUserBodyImageURLUseCase = fetchUserBodyImageURLUseCase;
    this.authServiceMiddleware = authServiceMiddleware;
    this.commonHeaders = commonHeaders;
    this.createUserBodyImageValidation = createUserBodyImageValidation;
    this.fetchUserImageURLValidation = fetchUserImageURLValidation;
    this.userRepository = userRepository;
  }

  async createUserBodyImage(req, res) {
    const userType = req.userType;
    const bodyImage = req.body.bodyImage;
    var userIdentifier;

    // userIdentifier = req.body.email;

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        userIdentifier = req.body.email;
        
        break;
      case CommonConstants.GUEST_USER_TYPE:
        userIdentifier = req.body.userID + "@example.com";
        break;
      default:
        res
          .status(APIResponseConstants.INVALID_TOKEN_STATUS_CODE)
          .send(JSON.stringify(invalidTokenResponse));
        return;
    }

    console.log("User Identifier:", userIdentifier);

    if (userIdentifier == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    

    // Call recommendation API and extract variables
    let recommendedSize, recommendedColors, recommendedShirts;
    try {

      console.log("Before recommendation call");

      const recommendations = await getRecommendations(req.body.bodyImage);
      const lines = recommendations.split("\n").map(line => line.trim());
      for (const line of lines) {
        if (line.startsWith("Size =")) {
          recommendedSize = line.split("=")[1].trim();
        } else if (line.startsWith("Recommended shirt colors =")) {
          // Store the whole comma separated string
          recommendedColors = line.split("=")[1].trim();
        } else if (line.startsWith("Recommended shirts =")) {
          // Store the whole comma separated string
          recommendedShirts = line.split("=")[1].trim();
        }
      }
    } catch (error) {
      console.error("Failed to call recommendation API:", error);
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    // Call use case with additional parameters: size, recommendedColors, recommendedShirts
    const useCaseResponse = await this.createUserBodyImageUseCase.execute(
      userIdentifier,
      req.body.bodyImage,
      req.userType,
      recommendedSize,
      recommendedColors,
      recommendedShirts
    );

    console.log("User Body Image Identifider");
    console.log(userIdentifier);

    var repoReturnedValues;


    // var repoReturnedValues =  this.getUserByEmail(userIdentifier);


    try {
      const result = await prisma.user.findUnique({
        where: {
          email: userIdentifier,
        },
      });

      console.log("Result");
      console.log(result);

      if (!result) {
        return [null, null];
      }

      const imageRecord = await prisma.user_body_image.findUnique({
        where: { user_id: result.id },
      });
      const recommendedSize = imageRecord ? imageRecord.recommended_size : null;
     repoReturnedValues = [
        new User(
          result.id,
          result.email,
          result.first_name,
          result.last_name,
          result.phone,
          result.created_at,
          result.modified_at,
          result.gender,
          result.dob,
          result.is_verified,
          result.is_subscribed,
          result.is_body_scanned,
          result.is_face_scanned,
          result.role
        ),
        null,
        recommendedSize
      ];
    } catch (error) {
      console.log("failed to read user from db, error: ", error);
     repoReturnedValues = [null, error];
    }

    
    console.log("repoReturnedValues", repoReturnedValues);
    console.log(repoReturnedValues);

    const plainUser = repoReturnedValues[0];
    const newUser1 = Object.setPrototypeOf(plainUser, User.prototype);
    newUser1.recommendedSize = repoReturnedValues[2];

    console.log("coming here");
    console.log(newUser1);


    



    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {

      res
        .status(useCaseResponse.getStatusCode())
        .send(JSON.stringify(newUser1));

      //  return new APIResponse(
      //     new APIResponseMessage(
      //       newUser1,
      //       APIResponseConstants.USER_EXIST_MESSAGE_CODE
      //     ),
      //     APIResponseConstants.SUCCESS_STATUS_CODE
      //   );

    }
  }

  async getUserByEmail(userEmail) {
      try {
        const result = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        console.log("Result");
        console.log(result);
  
        if (!result) {
          return [null, null];
        }
  
        const imageRecord = await prisma.user_body_image.findUnique({
          where: { user_id: result.id },
        });
        const recommendedSize = imageRecord ? imageRecord.recommended_size : null;
        return [
          new User(
            result.id,
            result.email,
            result.first_name,
            result.last_name,
            result.phone,
            result.created_at,
            result.modified_at,
            result.gender,
            result.dob,
            result.is_verified,
            result.is_subscribed,
            result.is_body_scanned,
            result.is_face_scanned,
            result.role
          ),
          null,
          recommendedSize
        ];
      } catch (error) {
        console.log("failed to read user from db, error: ", error);
        return [null, error];
      }
    }

  async fetchUserBodyImage(req, res) {
    const userID = req.params.userID;
    const useCaseResponse = await this.fetchUserBodyImageUseCase.execute(
      userID
    );
    if (useCaseResponse == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
    } else {
      if (
        typeof useCaseResponse.getResponseMessage().getMessage() == "string"
      ) {
        res
          .status(useCaseResponse.getStatusCode())
          .send(JSON.stringify(useCaseResponse.getResponseMessage()));
        return;
      }

      var imageType, imageName;
      try {
        const imageFileType = await fileTypeFromBuffer(
          useCaseResponse.getResponseMessage().getMessage().getBodyImage()
        );
        imageType = imageFileType.mime;
        imageName = util.format("image.%s", imageFileType.ext);
      } catch (error) {
        console.log("failed to detect image type, error: ", error);
        // fallback if image type is not detected
        imageType = "image/png";
        imageName = "image.png";
      }

      res.writeHead(useCaseResponse.getStatusCode(), {
        "Content-Disposition": util.format(
          'attachment; filename="%s"',
          imageName
        ),
        "Content-Type": imageType,
      });
      res.end(useCaseResponse.getResponseMessage().getMessage().getBodyImage());
    }
  }

  async updateUserBodyImage(req, res) {
    const userType = req.userType;
    const bodyImage = req.body.bodyImage;
    var userIdentifier;

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        userIdentifier = req.body.email;
        break;
      case CommonConstants.GUEST_USER_TYPE:
        userIdentifier = req.body.userID;
        break;
      default:
        res
          .status(APIResponseConstants.INVALID_TOKEN_STATUS_CODE)
          .send(JSON.stringify(invalidTokenResponse));
        return;
    }

    if (userIdentifier == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    const useCaseResponse = await this.updateUserBodyImageUseCase.execute(
      userIdentifier,
      bodyImage,
      userType
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

  async deleteUserBodyImage(req, res) {
    const userType = req.userType;
    var userIdentifier;

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        userIdentifier = req.query.email;
        break;
      case CommonConstants.GUEST_USER_TYPE:
        userIdentifier = req.query.userID;
        break;
      default:
        res
          .status(APIResponseConstants.INVALID_TOKEN_STATUS_CODE)
          .send(JSON.stringify(invalidTokenResponse));
        return;
    }

    if (userIdentifier == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    const useCaseResponse = await this.deleteUserBodyImageUseCase.execute(
      userIdentifier,
      userType
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

  async fetchUserBodyImageURL(req, res) {
    const userType = req.userType;
    var userIdentifier;

    switch (userType) {
      case CommonConstants.REGISTERED_USER_TYPE:
        userIdentifier = req.query.email;
        break;
      case CommonConstants.GUEST_USER_TYPE:
        userIdentifier = req.query.userID;
        break;
      default:
        res
          .status(APIResponseConstants.INVALID_TOKEN_STATUS_CODE)
          .send(JSON.stringify(invalidTokenResponse));
        return;
    }

    if (userIdentifier == null) {
      res
        .status(APIResponseConstants.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send(JSON.stringify(defaultApiResponseMessage));
      return;
    }

    const useCaseResponse = await this.fetchUserBodyImageURLUseCase.execute(
      userIdentifier,
      userType
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
      "/bodyImage",
      bodyParser.json({ limit: CommonConstants.BODY_PARSER_MAX_LIMIT }),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ALL_USERS_ACCESS
      ),
      this.createUserBodyImageValidation.validate.bind(this),
      this.createUserBodyImage.bind(this)
    );
    router.get(
      "/bodyImage/:userID",
      express.json(),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.fetchUserBodyImage.bind(this)
    );
    router.put(
      "/bodyImage",
      bodyParser.json({ limit: CommonConstants.BODY_PARSER_MAX_LIMIT }),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ALL_USERS_ACCESS
      ),
      this.createUserBodyImageValidation.validate.bind(this),
      this.updateUserBodyImage.bind(this)
    );
    router.delete(
      "/bodyImage",
      express.json(),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ALL_USERS_ACCESS
      ),
      this.fetchUserImageURLValidation.validate.bind(this),
      this.deleteUserBodyImage.bind(this)
    );
    router.get(
      "/bodyImage",
      express.json(),
      this.commonHeaders.addCommonHeaders.bind(this),
      this.authServiceMiddleware.verifyToken.bind(
        this,
        CommonConstants.ALL_USERS_ACCESS
      ),
      this.fetchUserImageURLValidation.validate.bind(this),
      this.fetchUserBodyImageURL.bind(this)
    );
    return router;
  }
}
