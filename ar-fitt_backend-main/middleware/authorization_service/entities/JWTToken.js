export class JWTToken {
  constructor() {
    // token header parameters
    this.algorithm = "";
    this.type = "";
    // token payload parameters
    this.id = "";
    this.issuer = "";
    this.subject = "";
    this.audience = "";
    this.notBefore = "";
    this.issuedAt = "";
    this.expiry = "";
    this.userType = "";
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
  }

  getAlgorithm() {
    return this.algorithm;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setIssuer(issuer) {
    this.issuer = issuer;
  }

  getIssuer() {
    return this.issuer;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  getSubject() {
    return this.subject;
  }

  setAudience(audience) {
    this.audience = audience;
  }

  getAudience() {
    return this.audience;
  }

  setNotBefore(notBefore) {
    this.notBefore = notBefore;
  }

  getNotBefore() {
    return this.notBefore;
  }

  setIssuedAt(issuedAt) {
    this.issuedAt = issuedAt;
  }

  getIssuedAt() {
    return this.issuedAt;
  }

  setExpiry(expiry) {
    this.expiry = expiry;
  }

  getExpiry() {
    return this.expiry;
  }

  setUserType(userType) {
    this.userType = userType;
  }

  getUserType() {
    return this.userType;
  }

  getHeader() {
    return {
      header: {
        alg: this.algorithm,
        typ: this.type,
      },
    };
  }

  getPayload() {
    return {
      jti: this.id,
      iss: this.issuer,
      sub: this.subject,
      aud: this.audience,
      nbf: this.notBefore,
      iat: this.issuedAt,
      exp: this.expiry,
      userType: this.userType,
    };
  }
}
