const express = require("express");
const mswcController = require("../controllers/mswcController");

const router = express.Router();

router.get("/active", mswcController.getActiveGodowns);
router.get("/inactive", mswcController.getInactiveGodowns);
router.get("/", mswcController.getAllGodowns);
router.get("/:uuid", mswcController.getGodownById);
router.post("/", mswcController.addGodown);
router.put("/:uuid", mswcController.updateGodown);
router.delete("/:uuid", mswcController.deleteGodown);

module.exports = router;