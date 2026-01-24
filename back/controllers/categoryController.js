const Category = require("../models/categoryModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get All Categories**
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Category by ID**
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Category**
exports.addCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await Category.add({ category_name, description });
    updateTableStats('categories');
    res.status(201).json({ message: "Category added successfully", category_id: result.insertId });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Database insertion error" });
  }
};

// **Update Category**
exports.updateCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await Category.update(req.params.category_id, { category_name, description });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    updateTableStats('categories');
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Delete Category**
exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.delete(req.params.category_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    updateTableStats('categories');
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Database deletion error" });
  }
};