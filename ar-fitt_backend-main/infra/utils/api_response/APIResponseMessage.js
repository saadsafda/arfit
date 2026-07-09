export class APIResponseMessage {
  constructor(message, messageCode) {
    this.message = message;
    this.messageCode = messageCode;
  }

  setMessage(message) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  setMessageCode(messageCode) {
    this.messageCode = messageCode;
  }

  getMessageCode() {
    return this.messageCode;
  }
}
