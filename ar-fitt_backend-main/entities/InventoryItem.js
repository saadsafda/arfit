export class InventoryItem {
  constructor(
    id,
    categoryID,
    name,
    brand,
    price,
    currency,
    description,
    createdAt,
    modifiedAt,
    lensId,
    gender
  ) {
    this.id = id;
    this.categoryID = categoryID;
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.currency = currency;
    this.description = description;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.itemColors = null;
    this.itemImagesURLs = null;
    this.itemSizes = null;
    this.lensId = lensId;
    this.gender = gender;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setCategoryID(categoryID) {
    this.categoryID = categoryID;
  }

  getCategoryID() {
    return this.categoryID;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setBrand(brand) {
    this.brand = brand;
  }

  getBrand() {
    return this.brand;
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

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
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

  setItemColors(itemColors) {
    this.itemColors = itemColors;
  }

  getItemColors() {
    return this.itemColors;
  }

  setItemImageURLs(itemImageURLs) {
    this.itemImagesURLs = itemImageURLs;
  }

  getItemImageURLs() {
    return this.itemImagesURLs;
  }

  setItemSizes(itemSizes) {
    this.itemSizes = itemSizes;
  }

  getItemSizes() {
    return this.itemSizes;
  }

  getLensId() {
    return this.lensId;
  }

  setGender(gender) {
    this.gender = gender;
  }

  getGender() {
    return this.gender;
  }
}
