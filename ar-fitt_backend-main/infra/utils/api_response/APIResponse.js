export class APIResponse {
  constructor(responseMessage, statusCode) {
    this.responseMessage = responseMessage;
    this.statusCode = statusCode;
  }

  setResponseMessage(responseMessage) {
    this.responseMessage = responseMessage;
  }

  getResponseMessage() {
    return this.responseMessage;
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }
}
