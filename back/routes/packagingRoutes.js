const express = require("express");
const packagingController = require("../controllers/packagingController");

const router = express.Router();

router.get("/", packagingController.getAllPackaging);
router.get("/:uuid", packagingController.getPackagingById);
router.post("/", packagingController.addPackaging);
router.put("/:uuid", packagingController.updatePackaging);
router.delete("/:uuid", packagingController.deletePackaging);

module.exports = router;