const express = require("express");
const grainController = require("../controllers/grainController");

const router = express.Router();

router.get("/unified", grainController.getGrainsUnified);
router.get("/", grainController.getAllGrains);
router.get("/:uuid", grainController.getGrainById);
router.post("/", grainController.addGrain);
router.put("/:uuid", grainController.updateGrain);
router.delete("/:uuid", grainController.deleteGrain);
router.patch("/:uuid/status", grainController.toggleGrainStatus);

module.exports = router;