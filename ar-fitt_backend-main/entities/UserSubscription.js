export class UserSubscription {
  constructor(id, subscriptionPlanID, subscriptionID, createdAt, modifiedAt) {
    this.userID = id;
    this.subscriptionPlanID = subscriptionPlanID;
    this.subscriptionID = subscriptionID;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(id) {
    this.userID = id;
  }

  getUserID() {
    return this.userID;
  }

  setSubscriptionPlanID(subscriptionPlanID) {
    this.subscriptionPlanID = subscriptionPlanID;
  }

  getSubscriptionPlanID() {
    return this.subscriptionPlanID;
  }

  setSubscriptionID(subscriptionID) {
    this.subscriptionID = subscriptionID;
  }

  getSubscriptionID() {
    return this.subscriptionID;
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
