
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Define routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;