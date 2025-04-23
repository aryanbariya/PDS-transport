const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// Define routes
router.get("/", categoryController.getAllCategories);
router.get("/:category_id", categoryController.getCategoryById);
router.post("/", categoryController.addCategory);
router.put("/:category_id", categoryController.updateCategory);
router.delete("/:category_id", categoryController.deleteCategory);

module.exports = router;