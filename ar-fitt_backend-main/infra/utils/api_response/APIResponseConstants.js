export const APIResponseConstants = {
  INTERNAL_SERVER_ERROR_MESSAGE: "Internal server error occurred.",
  INTERNAL_SERVER_ERROR_MESSAGE_CODE: "internal_server_error",
  INTERNAL_SERVER_ERROR_STATUS_CODE: 500,

  USER_NOT_EXIST_MESSAGE: "User does not exist.",
  USER_NOT_EXIST_MESSAGE_CODE: "user_not_exist",

  USER_EXIST_MESSAGE: "The email associated with the user is registered.",
  USER_EXIST_MESSAGE_CODE: "user_exist",

  USER_REGISTERED_MESSAGE_CODE: "user_registered",

  INVALID_USER_CREDENTIAL_MESSAGE: "Either user email or password is invalid.",
  INVALID_USER_CREDENTIAL_MESSAGE_CODE: "invalid_user_credential",
  INVALID_USER_CREDENTIAL_STATUS_CODE: 401,

  OTP_EMAIL_SENT_MESSAGE: "OTP has been sent on the requested email.",
  OTP_EMAIL_SENT_MESSAGE_CODE: "otp_sent",
  INVALID_OTP_MESSAGE:
    "The provided OTP is invalid. Please request the OTP and try again.",
  INVALID_OTP_MESSAGE_CODE: "invalid_otp",
  EXPIRED_OTP_MESSAGE:
    "The provided OTP has expired. Please request the OTP and try again.",
  EXPIRED_OTP_MESSAGE_CODE: "expired_otp",
  VALID_OTP_MESSAGE: "OTP validated successfully.",
  VALID_OTP_MESSAGE_CODE: "valid_otp",

  USER_CREDENTIAL_SUCCESSFUL_RESET_MESSAGE:
    "The password for the user has been reset successfully.",
  USER_CREDENTIAL_SUCCESSFUL_RESET_MESSAGE_CODE: "password_reset_successful",
  USER_CREDENTIAL_RESET_EMAIL_MESSAGE:
    "The email has been sent to reset the password.",
  USER_CREDENTIAL_RESET_EMAIL_MESSAGE_CODE: "password_reset_email_sent",

  INVALID_TOKEN_MESSAGE: "Unauthorized access",
  INVALID_TOKEN_CODE: "unauthorized_access",

  INVALID_DATA_IN_REQUEST: "invalid_data_in_request",

  NO_SUBSCRIPTION_FOUND_MESSAGE: "No subscriptions found.",
  NO_SUBSCRIPTION_FOUND_MESSAGE_CODE: "subscription_not_found",

  SUBSCTIPTION_FOUND_MESSAGE_CODE: "subscription_found",

  PAYMENT_CHECKOUT_SESSION_CREATED_MESSAGE: "Payment checkout session created",
  PAYMENT_CHECKOUT_SESSSION_CREATED_MESSAGE_CODE:
    "payment_checkout_session_created",

  USER_NOT_SUBSCRIBED_MESSAGE:
    "User is not subscribed to any subscription plan",
  USER_NOT_SUBSCRIBED_MESSAGE_CODE: "user_not_subscribed",

  USER_SUBSCRIPTION_UPDATE_MESSAGE: "User subscription is updated",
  USER_SUBSCRIPTION_UPDATE_MESSAGE_CODE: "user_subscription_updated",

  USER_SUBSCRIPTION_DELETE_MESSAGE: "User subscription is deleted",
  USER_SUBSCRIPTION_DELETE_MESSAGE_CODE: "user_subscription_deleted",

  USER_UPDATED_MESSAGE: "User information is updated",
  USER_UPDATED_MESSAGE_CODE: "user_updated",

  USER_BODY_MATRIX_CREATED_MESSAGE: "User body matrix created.",
  USER_BODY_MATRIX_CREATED_MESSAGE_CODE: "user_body_matrix_created",

  USER_BODY_MATRIX_NOT_EXIST_MESSAGE:
    "Body matrix couldn't be found for the user",
  USER_BODY_MATRIX_NOT_EXIST_MESSAGE_CODE: "user_body_matrix_not_exist",

  USER_BODY_MATRIX_ALREADY_EXIST_MESSAGE:
    "Body matrix already exists for the user",
  USER_BODY_MATRIX_EXIST_MESSAGE_CODE: "user_body_matrix_exist",
  USER_BODY_MATRIX_ALREADY_EXIST_MESSAGE_CODE: "user_body_matrix_already_exist",

  USER_BODY_MATRIX_UPDATED_MESSAGE: "User body matrix updated.",
  USER_BODY_MATRIX_UPDATED_MESSAGE_CODE: "user_body_matrix_updated",

  USER_BODY_MATRIX_DELETED_MESSAGE: "User body matrix deleted.",
  USER_BODY_MATRIX_DELETED_MESSADE_CODE: "user_body_matrix_deleted",

  USER_FACE_MATRIX_CREATED_MESSAGE: "User face matrix created.",
  USER_FACE_MATRIX_CREATED_MESSAGE_CODE: "user_face_matrix_created",

  USER_FACE_MATRIX_NOT_EXIST_MESSAGE:
    "Face matrix couldn't be found for the user",
  USER_FACE_MATRIX_NOT_EXIST_MESSAGE_CODE: "user_face_matrix_not_exist",

  USER_FACE_MATRIX_ALREADY_EXIST_MESSAGE:
    "Face matrix already exists for the user",
  USER_FACE_MATRIX_EXIST_MESSAGE_CODE: "user_face_matrix_exist",
  USER_FACE_MATRIX_ALREADY_EXIST_MESSAGE_CODE: "user_face_matrix_already_exist",

  USER_FACE_MATRIX_UPDATED_MESSAGE: "User face matrix updated.",
  USER_FACE_MATRIX_UPDATED_MESSAGE_CODE: "user_face_matrix_updated",

  USER_FACE_MATRIX_DELETED_MESSAGE: "User face matrix deleted.",
  USER_FACE_MATRIX_DELETED_MESSADE_CODE: "user_face_matrix_deleted",

  USER_SUBSCRIBED_MESSAGE: "User is subscribed to a subscription plan",
  USER_SUBSCRIBED_MESSAGE_CODE: "user_subscribed",

  USER_BODY_IMAGE_CREATED_MESSAGE: "User body image created",
  USER_BODY_IMAGE_CREATED_MESSAGE_CODE: "user_body_image_created",

  USER_BODY_IMAGE_NOT_EXIST_MESSAGE:
    "Body image couldn't be found for the user",
  USER_BODY_IMAGE_NOT_EXIST_MESSAGE_CODE: "user_body_image_not_exist",

  USER_BODY_IMAGE_EXIST_MESSAGE_CODE: "user_body_image_exist",
  USER_BODY_IMAGE_ALREADY_EXIST_MESSAGE:
    "Body image already exist for the user",
  USER_BODY_IMAGE_ALREADY_EXIST_MESSAGE_CODE: "user_body_image_already_exist",

  USER_BODY_IMAGE_UPDATED_MESSAGE: "User body image updated.",
  USER_BODY_IMAGE_UPDATED_MESSAGE_CODE: "user_body_image_updated",

  USER_BODY_IMAGE_DELETED_MESSAGE: "User body image deleted.",
  USER_BODY_IMAGE_DELETED_MESSADE_CODE: "user_body_image_deleted",

  USER_FACE_IMAGE_CREATED_MESSAGE: "User face image created",
  USER_FACE_IMAGE_CREATED_MESSAGE_CODE: "user_face_image_created",

  USER_FACE_IMAGE_NOT_EXIST_MESSAGE:
    "Face image couldn't be found for the user",
  USER_FACE_IMAGE_NOT_EXIST_MESSAGE_CODE: "user_face_image_not_exist",

  USER_FACE_IMAGE_EXIST_MESSAGE_CODE: "user_face_image_exist",
  USER_FACE_IMAGE_ALREADY_EXIST_MESSAGE:
    "Face image already exist for the user",
  USER_FACE_IMAGE_ALREADY_EXIST_MESSAGE_CODE: "user_face_image_already_exist",

  USER_FACE_IMAGE_UPDATED_MESSAGE: "User face image updated.",
  USER_FACE_IMAGE_UPDATED_MESSAGE_CODE: "user_face_image_updated",

  USER_FACE_IMAGE_DELETED_MESSAGE: "User face image deleted.",
  USER_FACE_IMAGE_DELETED_MESSADE_CODE: "user_face_image_deleted",

  INVENTORY_CATEGORY_EXIST_MESSAGE_CODE: "inventory_category_exist",

  INVENTORY_CATEGORIES_NOT_EXIST_MESSAGE:
    "Inventory categories couldn't be found",
  INVENTORY_CATEGORIES_NOT_EXIST_MESSAGE_CODE: "inventory_category_not_exist",

  INVENTORY_CATEGORY_NOT_EXIST_MESSAGE: "Inventory category couldn't be found",

  INVENTORY_ITEMS_NOT_EXIST_MESSAGE: "Inventory items couldn't be found",
  INVENTORY_ITEMS_NOT_EXIST_MESSAGE_CODE: "inventory_item_not_exist",

  INVENTORY_ITEMS_EXIST_MESSAGE_CODE: "inventory_item_exist",

  INVENTORY_ITEM_IMAGE_NOT_EXIST_MESSAGE:
    "Inventory item image couldn't be found",
  INVENTORY_ITEM_IMAGE_NOT_EXIST_MESSAGE_CODE: "inventory_item_image_not_exist",

  INVENTORY_ITEM_IMAGE_EXIST_MESSAGE_CODE: "inventory_item_image_exist",

  GUEST_USER_REGISTERED_MESSAGE_CODE: "guest_user_registered",

  SUCCESS_STATUS_CODE: 200,
  ITEM_CREATED_STATUS_CODE: 201,
  INVALID_TOKEN_STATUS_CODE: 401,
  ITEM_NOT_FOUND: 404,
  FORBIDDEN_REQUEST: 403,
  CONFLICTED_REQUEST: 409,
  BAD_REQUEST: 400,
};
