const mongoose = require("mongoose");
const { MONGO_URI } = require("./constants");

const connectMongoose = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(MONGO_URI);

    console.info("DB Connection Successful");
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectMongoose };
