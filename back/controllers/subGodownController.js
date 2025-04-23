const { v4: uuidv4 } = require("uuid");
const SubGodown = require("../models/subGodownModel");

// **Get Active Sub-Godowns**
exports.getActiveSubGodowns = async (req, res) => {
  try {
    const subGodowns = await SubGodown.getActive();
    res.json(subGodowns);
  } catch (error) {
    console.error("Error fetching active godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Inactive Sub-Godowns**
exports.getInactiveSubGodowns = async (req, res) => {
  try {
    const subGodowns = await SubGodown.getInactive();
    res.json(subGodowns);
  } catch (error) {
    console.error("Error fetching inactive godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get All Godowns**
exports.getAllGodowns = async (req, res) => {
  try {
    const godowns = await SubGodown.getAllGodowns();
    res.json(godowns);
  } catch (error) {
    console.error("Error fetching godown names:", error);
    res.status(500).json({ error: "Database query error" });
  }
};

// **Get All Sub-Godowns**
exports.getAllSubGodowns = async (req, res) => {
  try {
    const subGodowns = await SubGodown.getAll();
    res.json(subGodowns);
  } catch (error) {
    console.error("Error fetching sub-godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Sub-Godown by UUID**
exports.getSubGodownById = async (req, res) => {
  try {
    const subGodown = await SubGodown.getById(req.params.uuid);
    if (!subGodown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json(subGodown);
  } catch (error) {
    console.error("Error fetching sub-godown:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Sub-Godown**
exports.addSubGodown = async (req, res) => {
  try {
    const { parentGodown, subGodown, status = "Active" } = req.body;

    const uuid = uuidv4();
    const subgodown_id = await SubGodown.getNextSubGodownId();

    await SubGodown.add({ uuid, parentGodown, subGodown, status, subgodown_id });

    res.status(201).json({ message: "Sub-Godown added successfully", uuid });
  } catch (error) {
    console.error("Error adding sub-godown:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Sub-Godown**
exports.updateSubGodown = async (req, res) => {
  try {
    const { parentGodown, subGodown, status } = req.body;

    const updatedStatus = status || "Active";

    const result = await SubGodown.update(req.params.uuid, { parentGodown, subGodown, status: updatedStatus });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json({ message: "Godown updated successfully" });
  } catch (error) {
    console.error("Error updating sub-godown:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Soft Delete Sub-Godown**
exports.deleteSubGodown = async (req, res) => {
  try {
    const result = await SubGodown.softDelete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json({ message: "Godown status updated to Inactive successfully!" });
  } catch (error) {
    console.error("Error deleting sub-godown:", error);
    res.status(500).json({ error: "Failed to update godown status" });
  }
};