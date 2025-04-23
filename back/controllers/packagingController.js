const { v4: uuidv4 } = require("uuid");
const Packaging = require("../models/packagingModel");

// **Get All Packaging Materials**
exports.getAllPackaging = async (req, res) => {
  try {
    const packaging = await Packaging.getAll();
    res.json(packaging);
  } catch (error) {
    console.error("Error fetching packaging materials:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Packaging Material by UUID**
exports.getPackagingById = async (req, res) => {
  try {
    const packaging = await Packaging.getById(req.params.uuid);
    if (!packaging) {
      return res.status(404).json({ message: "Packaging material not found" });
    }
    res.json(packaging);
  } catch (error) {
    console.error("Error fetching packaging material:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Packaging Material**
exports.addPackaging = async (req, res) => {
  try {
    const { material_name, weight, status = "Start" } = req.body;

    if (!material_name || !weight) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const uuid = uuidv4();
    const pack_id = await Packaging.getNextPackId();

    await Packaging.add({ uuid, material_name, weight, status, pack_id });

    res.status(201).json({ message: "Packaging material added successfully", uuid, pack_id });
  } catch (error) {
    console.error("Error adding packaging material:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Packaging Material**
exports.updatePackaging = async (req, res) => {
  try {
    const { material_name, weight, status } = req.body;

    if (!material_name || !weight || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await Packaging.update(req.params.uuid, { material_name, weight, status });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Packaging material not found" });
    }
    res.json({ message: "Packaging material updated successfully" });
  } catch (error) {
    console.error("Error updating packaging material:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Delete Packaging Material**
exports.deletePackaging = async (req, res) => {
  try {
    const result = await Packaging.delete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Packaging material not found" });
    }

    await Packaging.resetPackIds();
    res.json({ message: "Packaging material deleted and pack_id reset successfully!" });
  } catch (error) {
    console.error("Error deleting packaging material:", error);
    res.status(500).json({ error: "Database deletion failed" });
  }
};