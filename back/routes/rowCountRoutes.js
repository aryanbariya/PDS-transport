const express = require("express");
const rowCountController = require("../controllers/rowCountController");

const router = express.Router();

router.get("/", rowCountController.getRowCounts);

module.exports = router;