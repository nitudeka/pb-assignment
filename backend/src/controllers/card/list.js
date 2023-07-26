const CardModel = require("../../models/cards");

const getCards = async (req, res) => {
  const { uuid } = req.headers;

  const cards = await CardModel.find({ userId: uuid });

  res.json({ cards });
};

module.exports = getCards;
