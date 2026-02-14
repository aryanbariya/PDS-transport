const express = require("express");
const transportController = require("../controllers/transportController");

const router = express.Router();

// Static routes first
router.get("/unified", transportController.getTransportsUnified);
router.get("/active", transportController.getActiveTransports);
router.get("/inactive", transportController.getInactiveTransports);
router.get("/", transportController.getAllTransports);

// Parametric routes later
router.get("/:uuid", transportController.getTransportById);
router.post("/", transportController.addTransport);
router.put("/:uuid", transportController.updateTransport);
router.delete("/:uuid", transportController.deleteTransport);
router.patch("/:uuid/status", transportController.toggleTransportStatus);

module.exports = router;