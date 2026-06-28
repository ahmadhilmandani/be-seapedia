const express = require("express");
const router = express.Router();

const controller = require("./store.controller");
const { checkToken } = require("../../middleware/checkToken.middleware");

router.get("/", controller.index);

// router.get("/:name", controller.findByName);

router.get("/:id", controller.show);

router.post("/", checkToken, controller.store);

router.put("/:id", checkToken, controller.update);

router.delete("/:id", checkToken, controller.destroy);

module.exports = router;