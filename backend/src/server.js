const app = require("./app");
const { PORT } = require("./util/constants");

app.listen(PORT, () => {
  console.info(`Server is listining for requests on port ${PORT}`);
});
