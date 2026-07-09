export class InventoryItemSize {
  constructor(id, itemID, size, createdAt, modifiedAt) {
    this.id = id;
    this.itemID = itemID;
    this.size = size;
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

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
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
