const express = require("express");
const router = express.Router();
const controller = require("../controllers/vaccinesController.js");

router.post("/", controller.createVaccine);

module.exports = router;