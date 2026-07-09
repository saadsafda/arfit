export class UserFaceImage {
  constructor(userID, faceImage, createdAt, modifiedAt) {
    this.userID = userID;
    this.faceImage = faceImage;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setFaceImage(faceImage) {
    this.faceImage = faceImage;
  }

  getFaceImage() {
    return this.faceImage;
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
