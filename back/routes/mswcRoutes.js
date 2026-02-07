const express = require("express");
const mswcController = require("../controllers/mswcController");

const router = express.Router();

router.get("/active", mswcController.getActiveGodowns);
router.get("/inactive", mswcController.getInactiveGodowns);
router.get("/unified", mswcController.getGodownsUnified);
router.get("/", mswcController.getAllGodowns);
router.get("/:uuid", mswcController.getGodownById);
router.post("/", mswcController.addGodown);
router.put("/:uuid", mswcController.updateGodown);
router.delete("/:uuid", mswcController.deleteGodown);
router.patch("/:uuid/status", mswcController.toggleGodownStatus);

module.exports = router;