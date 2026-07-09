export class InventoryItemImageURL {
  constructor(id, itemID, imageURL, createdAt, modifiedAt) {
    this.id = id;
    this.itemID = itemID;
    this.imageURL = imageURL;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    this.id = id;
  }

  setItemID(itemID) {
    this.itemID = itemID;
  }

  getItemID() {
    return this.itemID;
  }

  setImageURL(imageURL) {
    this.imageURL = imageURL;
  }

  getImageURL() {
    return this.imageURL;
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
