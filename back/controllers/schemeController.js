const { v4: uuidv4 } = require("uuid");
const Scheme = require("../models/schemeModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get All Schemes**
exports.getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.getAll();
    res.json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Scheme by UUID**
exports.getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.getById(req.params.uuid);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json(scheme);
  } catch (error) {
    console.error("Error fetching scheme:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Scheme**
exports.addScheme = async (req, res) => {
  try {
    const { scheme_name, scheme_status } = req.body;

    if (!scheme_name || !scheme_status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const uuid = uuidv4();
    const scheme_id = await Scheme.getNextSchemeId();

    await Scheme.add({ uuid, scheme_name, scheme_status, scheme_id });
    updateTableStats('scheme');

    res.status(201).json({ message: "Scheme added successfully", uuid, scheme_id });
  } catch (error) {
    console.error("Error adding scheme:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Scheme**
exports.updateScheme = async (req, res) => {
  try {
    const { scheme_name, scheme_status } = req.body;

    if (!scheme_name || !scheme_status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await Scheme.update(req.params.uuid, { scheme_name, scheme_status });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    updateTableStats('scheme');
    res.json({ message: "Scheme updated successfully" });
  } catch (error) {
    console.error("Error updating scheme:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Delete Scheme**
exports.deleteScheme = async (req, res) => {
  try {
    const result = await Scheme.delete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Scheme not found" });
    }

    await Scheme.resetSchemeIds();
    updateTableStats('scheme');
    res.json({ message: "Scheme deleted and scheme IDs reset successfully!" });
  } catch (error) {
    console.error("Error deleting scheme:", error);
    res.status(500).json({ error: "Database deletion failed" });
  }
};