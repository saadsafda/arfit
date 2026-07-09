export class UserFaceImageURL {
  constructor(userID, faceImageURL, createdAt, modifiedAt) {
    this.userID = userID;
    this.faceImageURL = faceImageURL;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setFaceImageURL(faceImageURL) {
    this.faceImageURL = faceImageURL;
  }

  getFaceImageURL() {
    return this.faceImageURL;
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
