export class UserBodyImage {
  constructor(userID, bodyImage, recommendedSize, recommendedColors, recommendedShirts) {
    this.userID = userID;
    this.bodyImage = bodyImage;
    // this.createdAt = createdAt;
    // this.modifiedAt = modifiedAt;
    this.recommendedSize = recommendedSize;
    this.recommendedColors = recommendedColors;
    this.recommendedShirts = recommendedShirts;
    
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setBodyImage(bodyImage) {
    this.bodyImage = bodyImage;
  }

  getBodyImage() {
    return this.bodyImage;
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


  setRecommendedSize(recommendedSize) {
    this.recommendedSize = recommendedSize;
  }

  getRecommendedSize() {
    return this.recommendedSize;
  }

  setRecommendedColors(recommendedColors) {
    this.recommendedColors = recommendedColors;
  }

  getRecommendedColors() {
    return this.recommendedColors;
  }

  setRecommendedShirts(recommendedShirts) {
    this.recommendedShirts = recommendedShirts;
  }


  getRecommendedShirts() {
    return this.recommendedShirts;
  }
}
