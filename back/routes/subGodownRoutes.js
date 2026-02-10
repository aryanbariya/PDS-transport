const express = require("express");
const subGodownController = require("../controllers/subGodownController");

const router = express.Router();

router.get("/active", subGodownController.getActiveSubGodowns);
router.get("/inactive", subGodownController.getInactiveSubGodowns);
router.get("/godowns", subGodownController.getAllGodowns);
router.get("/unified", subGodownController.getSubGodownsUnified);
router.get("/", subGodownController.getAllSubGodowns);
router.get("/:uuid", subGodownController.getSubGodownById);
router.post("/", subGodownController.addSubGodown);
router.put("/:uuid", subGodownController.updateSubGodown);
router.delete("/:uuid", subGodownController.deleteSubGodown);
router.patch("/:uuid/status", subGodownController.toggleSubGodownStatus);

module.exports = router;