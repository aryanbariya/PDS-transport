const express = require("express");
const driverController = require("../controllers/driverController");

const router = express.Router();

router.get("/active", driverController.getActiveDrivers);
router.get("/inactive", driverController.getInactiveDrivers);
router.get("/", driverController.getAllDrivers);
router.get("/:uuid", driverController.getDriverById);
router.post("/", driverController.addDriver);
router.put("/:uuid", driverController.updateDriver);
router.delete("/:uuid", driverController.deleteDriver);

module.exports = router;