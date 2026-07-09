export class PaymentServiceUser {
  constructor(id, paymentServiceUserID, createdAt, modifiedAt) {
    this.userID = id;
    this.paymentServiceUserID = paymentServiceUserID;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setUserID(id) {
    this.userID = id;
  }

  getUserID() {
    return this.userID;
  }

  setPaymentServiceUserID(paymentServiceID) {
    this.paymentServiceUserID = paymentServiceID;
  }

  getPaymentServiceUserID() {
    return this.paymentServiceUserID;
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
