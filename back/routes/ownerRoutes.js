const express = require("express");
const ownerController = require("../controllers/ownerController");

const router = express.Router();

router.get("/", ownerController.getAllOwners);
router.get("/:uuid", ownerController.getOwnerById);
router.post("/", ownerController.addOwner);
router.put("/:uuid", ownerController.updateOwner);
router.delete("/:uuid", ownerController.deleteOwner);

module.exports = router;