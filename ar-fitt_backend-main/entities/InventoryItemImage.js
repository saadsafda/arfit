export class InventoryItemImage {
  constructor(id, itemID, image, createdAt, modifiedAt) {
    this.id = id;
    this.itemID = itemID;
    this.image = image;
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

  setImage(image) {
    this.image = image;
  }

  getImage() {
    return this.image;
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
