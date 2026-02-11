const express = require("express");
const schemeController = require("../controllers/schemeController");

const router = express.Router();

router.get("/", schemeController.getAllSchemes);
router.get("/unified", schemeController.getAllSchemesUnified);
router.get("/:uuid", schemeController.getSchemeById);
router.post("/", schemeController.addScheme);
router.put("/:uuid", schemeController.updateScheme);
router.delete("/:uuid", schemeController.deleteScheme);

module.exports = router;