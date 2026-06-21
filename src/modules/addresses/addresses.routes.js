// addresses.route.js

const express = require("express");
const controller = require("./addresses.controller");
const { checkToken } = require("../../middleware/checkToken.middleware");

const router = express.Router();

router.post("/", checkToken, controller.create);

router.get("/", checkToken, controller.findAll);

router.get("/:id", checkToken, controller.findById);

router.put("/:id", checkToken, controller.update);

router.delete("/:id", checkToken, controller.remove);

module.exports = router;