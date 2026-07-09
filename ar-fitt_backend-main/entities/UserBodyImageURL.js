export class UserBodyImageURL {
  constructor(userID, bodyImageURL, createdAt, modifiedAt) {
    this.userID = userID;
    this.bodyImageURL = bodyImageURL;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setBodyImageURL(bodyImageURL) {
    this.bodyImageURL = bodyImageURL;
  }

  getBodyImageURL() {
    return this.bodyImageURL;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  setModifiedAt(modifiedAt) {
    this.modifiedAt = modifiedAt;
  }

  getModifiedAt() {
    return this.modifiedAt;
  }
}
