const CardModel = require("../../models/cards");

const getCards = async (_, res) => {
  const cards = await CardModel.find({});

  res.json({ cards });
};

module.exports = getCards;
