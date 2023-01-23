const express = require("express");
const controller = require("./character.controller");

const router = express.Router();

router.get("/", controller.indexGet);

router.get("/:id", controller.getById);

router.post("/created", controller.createPost);

router.put("/edit/:id", controller.createPost);

router.delete("/delete/:id", controller.deleteCharacter);

module.exports = router;