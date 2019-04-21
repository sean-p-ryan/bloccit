const express = require("express");
const router = express.Router();

const advertisementController = require("../controllers/advertisementController")

router.get("/advertisement", advertisementController.index);
router.get("/advertisement/new", advertisementController.new);
router.post("/advertisements/create", advertisementController.create);

module.exports = router;