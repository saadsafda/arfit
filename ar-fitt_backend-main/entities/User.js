export class User {
  constructor(
    id,
    email,
    firstName,
    lastName,
    phone,
    createdAt,
    modifiedAt,
    gender,
    dob,
    isVerified,
    isSubscribed,
    isBodyScanned,
    isFaceScanned,
    role
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.gender = gender;
    this.dob = dob;
    this.isVerified = isVerified;
    this.isSubscribed = isSubscribed;
    this.isBodyScanned = isBodyScanned;
    this.isFaceScanned = isFaceScanned;
    this.role = role;
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

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  getFirstName() {
    return this.firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  getLastName() {
    return this.lastName;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  getPhone() {
    return this.phone;
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

  setGender(gender) {
    this.gender = gender;
  }

  getGender() {
    return this.gender;
  }

  setDOB(dob) {
    this.dob = dob;
  }

  getDOB() {
    return this.dob;
  }

  setIsVerified(isVerified) {
    this.isVerified = isVerified;
  }

  getIsVerified() {
    return this.isVerified;
  }

  setIsSubscribed(isSubscribed) {
    this.isSubscribed = isSubscribed;
  }

  getIsSubscribed() {
    return this.isSubscribed;
  }

  setIsBodyScanned(isBodyScanned) {
    this.isBodyScanned = isBodyScanned;
  }

  getIsBodyScanned() {
    return this.isBodyScanned;
  }

  setIsFaceScanned(isFaceScanned) {
    this.isFaceScanned = isFaceScanned;
  }

  getIsFaceScanned() {
    return this.isFaceScanned;
  }

  setRole(role) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
