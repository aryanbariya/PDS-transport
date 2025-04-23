const express = require("express");
const allocController = require("../controllers/allocController");

const router = express.Router();

// Define routes
router.get("/", allocController.getAllAllocations);
router.get("/:do_allocate_id", allocController.getAllocationById);

module.exports = router;