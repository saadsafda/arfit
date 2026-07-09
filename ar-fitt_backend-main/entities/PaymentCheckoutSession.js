export class PaymentCheckoutSession {
  constructor(url) {
    this.checkout_session_url = url;
  }

  setCheckoutSessionURL(url) {
    this.checkout_session_url = url;
  }

  getCheckoutSessionURL() {
    return this.checkout_session_url;
  }
}
