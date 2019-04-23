const express = require("express");
const router = express.Router();

const advertisementController = require("../controllers/advertisementController")

router.get("/advertisement", advertisementController.index);
router.get("/advertisement/new", advertisementController.new);
router.get("/advertisement/:id", advertisementController.show);

router.post("/advertisement/create", advertisementController.create);

module.exports = router;

