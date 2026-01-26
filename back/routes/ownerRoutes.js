const express = require("express");
const ownerController = require("../controllers/ownerController");

const router = express.Router();

// Static routes first

router.get("/unified", ownerController.getOwnersUnified);
router.get("/", ownerController.getAllOwners);

// Parametric routes later
router.get("/:uuid", ownerController.getOwnerById);
router.post("/", ownerController.addOwner);
router.put("/:uuid", ownerController.updateOwner);
router.delete("/:uuid", ownerController.deleteOwner);
router.patch("/:uuid/status", ownerController.toggleOwnerStatus);

module.exports = router;