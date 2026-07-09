export class UserOTP {
  constructor(id, email, otp, createdAt, modifiedAt) {
    this.id = id;
    this.email = email;
    this.otpHash = otp;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setOTPHash(otp) {
    this.otpHash = otp;
  }

  getOTPHash() {
    return this.otpHash;
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

  validateOTP(otp) {
    return this.otpHash == otp;
  }
}
