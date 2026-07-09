export class UserFaceMatrix {
  constructor(userID, faceMatrix, createdAt, modifiedAt) {
    this.userID = userID;
    this.faceMatrix = faceMatrix;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setFaceMatrix(faceMatrix) {
    this.faceMatrix = faceMatrix;
  }

  getFaceMatrix() {
    return this.faceMatrix;
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
