const { validateCard } = require("../../lib/common");
const CardModel = require("../../models/cards");

const addNewCard = async (req, res) => {
  const { cardNumber, expiryDate, cvv, name } = req.body;
  const userId = req.headers.uuid;

  if (!cardNumber || !expiryDate || !cvv || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (cardNumber && !validateCard(cardNumber)) {
    return res.status(400).json({ message: "Invalid card number" });
  }
  const existingCard = await CardModel.findOne({ userId, cardNumber });
  if (existingCard) {
    return res.status(400).json({ message: "Card already exists" });
  }

  const newCard = new CardModel({
    userId: req.headers.uuid,
    cardNumber,
    expiryDate,
    cvv,
    name,
  });

  await newCard.save();

  res.json({ data: newCard });
};

module.exports = addNewCard;
