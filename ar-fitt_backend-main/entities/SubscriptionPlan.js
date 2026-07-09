export class SubscriptionPlan {
  constructor(id, price, priceID, currency, interval, recurring) {
    this.id = id;
    this.price = price;
    this.priceID = priceID;
    this.currency = currency;
    this.interval = interval;
    this.recurring = recurring;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setPrice(price) {
    this.price = price;
  }

  getPrice() {
    return this.price;
  }

  setCurrency(currency) {
    this.currency = currency;
  }

  getCurrency() {
    return this.currency;
  }

  setInterval(interval) {
    this.interval = interval;
  }

  getInterval() {
    return this.interval;
  }

  setPriceID(priceID) {
    this.priceID = priceID;
  }

  getPriceID() {
    return this.priceID;
  }

  setRecurring(recurring) {
    this.recurring = recurring;
  }

  getRecurring() {
    return this.recurring;
  }
}
