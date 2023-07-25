const { validateCard } = require("../../lib/common");
const CardModel = require("../../models/cards");

const addNewCard = async (req, res) => {
  const { cardNumber, expiryDate, cvv, name } = req.body;

  if (!cardNumber || !expiryDate || !cvv || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (cardNumber && !validateCard(cardNumber)) {
    return res.status(400).json({ message: "Invalid card number" });
  }

  const newCard = new CardModel({ cardNumber, expiryDate, cvv, name });

  await newCard.save();

  res.json({ data: newCard });
};

module.exports = addNewCard;
