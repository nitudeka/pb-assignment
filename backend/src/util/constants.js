const constants = {};

constants.PORT = process.env.PORT || 3002;
constants.MONGO_URI = process.env.MONGO_URI || "";

module.exports = constants;
