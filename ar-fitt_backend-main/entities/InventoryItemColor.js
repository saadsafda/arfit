export class InventoryItemColor {
  constructor(id, itemID, color, colorHex, createdAt, modifiedAt) {
    this.id = id;
    this.itemID = itemID;
    this.color = color;
    this.colorHex = colorHex;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setItemID(itemID) {
    this.itemID = itemID;
  }

  getItemID() {
    return this.itemID;
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  setColorHex(colorHex) {
    this.colorHex = colorHex;
  }

  getColorHex() {
    return this.colorHex;
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
