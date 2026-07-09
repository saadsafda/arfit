export class UserCredential {
  constructor(email, passwordHash, createdAt, modifiedAt) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setPasswordHash(passwordHash) {
    this.passwordHash = passwordHash;
  }

  getPasswordHash() {
    return this.passwordHash;
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

  validatePassword(passwordHash) {
    return this.passwordHash == passwordHash;
  }
}
