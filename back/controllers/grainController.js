const { v4: uuidv4 } = require("uuid");
const Grain = require("../models/grainModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get All Grains**
exports.getAllGrains = async (req, res) => {
  try {
    const grains = await Grain.getAll();
    res.json(grains);
  } catch (error) {
    console.error("Error fetching grains:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

// **Get Grain by UUID**
exports.getGrainById = async (req, res) => {
  try {
    const grain = await Grain.getById(req.params.uuid);
    if (!grain) {
      return res.status(404).json({ message: "Grain not found" });
    }
    res.json(grain);
  } catch (error) {
    console.error("Error fetching grain:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

// **Add New Grain**
exports.addGrain = async (req, res) => {
  try {
    const { grainName, godownName } = req.body;

    if (!grainName || !godownName) {
      return res.status(400).json({ error: "Grain name and one Godown selection are required" });
    }

    const uuid = uuidv4();
    const nextGrainId = await Grain.getNextGrainId();

    await Grain.add({ uuid, grainName, godownName, grain_id: nextGrainId });
    updateTableStats('grains');

    res.status(201).json({ message: "Grain added successfully", uuid, grain_id: nextGrainId });
  } catch (error) {
    console.error("Error adding grain:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Grain**
exports.updateGrain = async (req, res) => {
  try {
    const { grainName, mswcGodown, subGodown } = req.body;

    if (!grainName || (!mswcGodown && !subGodown)) {
      return res.status(400).json({ error: "Grain name and one Godown selection are required" });
    }

    const godownName = mswcGodown || subGodown;

    const result = await Grain.update(req.params.uuid, { grainName, godownName });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Grain not found" });
    }
    updateTableStats('grains');
    res.json({ message: "Grain updated successfully" });
  } catch (error) {
    console.error("Error updating grain:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Delete Grain**
exports.deleteGrain = async (req, res) => {
  try {
    const result = await Grain.delete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Grain not found" });
    }

    await Grain.resetGrainIds();
    updateTableStats('grains');
    res.json({ message: "Grain deleted and grain IDs reset successfully!" });
  } catch (error) {
    console.error("Error deleting grain:", error);
    res.status(500).json({ error: "Database deletion failed" });
  }
};