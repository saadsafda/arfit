export class UserBodyMatrix {
  constructor(userID, bodyMatrix, createdAt, modifiedAt) {
    this.userID = userID;
    this.bodyMatrix = bodyMatrix;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setBodyMatrix(bodyMatrix) {
    this.bodyMatrix = bodyMatrix;
  }

  getBodyMatrix() {
    return this.bodyMatrix;
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
