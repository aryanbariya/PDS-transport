const express = require("express");
const transportController = require("../controllers/transportController");

const router = express.Router();

router.get("/active", transportController.getActiveTransports);
router.get("/inactive", transportController.getInactiveTransports);
router.get("/", transportController.getAllTransports);
router.get("/:uuid", transportController.getTransportById);
router.post("/", transportController.addTransport);
router.put("/:uuid", transportController.updateTransport);
router.delete("/:uuid", transportController.deleteTransport);

module.exports = router;