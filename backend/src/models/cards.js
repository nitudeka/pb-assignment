const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

const CardModel = mongoose.model("Card", cardSchema);

module.exports = CardModel;
