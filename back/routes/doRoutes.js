const express = require("express");
const doController = require("../controllers/doController");

const router = express.Router();

router.get("/", doController.getAllDOs);
router.get("/mc", doController.getAllMSWCGodowns);
router.get("/next-do", doController.getNextDoNo);
router.get("/:doNo", doController.getDOByNumber);
router.post("/", doController.addDO);
router.put("/:stock_id", doController.updateDO);


module.exports = router;