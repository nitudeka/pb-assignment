const app = require("./app");
const { PORT } = require("./util/constants");
const { connectMongoose } = require("./util/mongoose");

app.listen(PORT, () => {
  connectMongoose();
  console.info(`Server is listining for requests on port ${PORT}`);
});
