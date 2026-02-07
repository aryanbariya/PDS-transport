const express = require("express");
const truckController = require("../controllers/truckController");

const router = express.Router();

router.get("/truckowner", truckController.getAllTrucksByOwner);
router.get("/active", truckController.getActiveTrucks);
router.get("/inactive", truckController.getInactiveTrucks);
router.get("/unified", truckController.getTrucksUnified);
router.get("/", truckController.getAllTrucks);
router.get("/:uuid", truckController.getTruckById);
router.post("/", truckController.addTruck);
router.put("/:uuid", truckController.updateTruck);
router.delete("/:uuid", truckController.deleteTruck);
router.patch("/:uuid/status", truckController.toggleTruckStatus);

module.exports = router;