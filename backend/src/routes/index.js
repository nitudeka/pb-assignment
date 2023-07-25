const { Router } = require("express");
const controllers = require("../controllers/index");

const router = new Router();

router
  .route("/cards")
  .get(controllers.cardController.listCards)
  .post(controllers.cardController.newCard);

module.exports = router;
