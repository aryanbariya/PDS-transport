const { v4: uuidv4 } = require("uuid");
const MSWC = require("../models/mswcModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get Active MSWC Godowns**
exports.getActiveGodowns = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const godowns = await MSWC.getActive(99999, 0); // High limit for no pagination
      return res.json(godowns);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [godowns, total] = await Promise.all([
      MSWC.getActive(limit, offset),
      MSWC.getActiveCount()
    ]);

    res.json({
      data: godowns,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching active godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Inactive MSWC Godowns**
exports.getInactiveGodowns = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const godowns = await MSWC.getInactive(99999, 0);
      return res.json(godowns);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [godowns, total] = await Promise.all([
      MSWC.getInactive(limit, offset),
      MSWC.getInactiveCount()
    ]);

    res.json({
      data: godowns,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching inactive godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get All MSWC Godowns**
exports.getAllGodowns = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const godowns = await MSWC.getAll(99999, 0);
      return res.json(godowns);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [godowns, total] = await Promise.all([
      MSWC.getAll(limit, offset),
      MSWC.getCount()
    ]);

    res.json({
      data: godowns,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get MSWC Godown by UUID**
exports.getGodownById = async (req, res) => {
  try {
    const godown = await MSWC.getById(req.params.uuid);
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json(godown);
  } catch (error) {
    console.error("Error fetching godown:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New MSWC Godown**
exports.addGodown = async (req, res) => {
  try {
    const { godownName, godownUnder } = req.body;

    if (!godownName) {
      return res.status(400).json({ error: "Godown Name and Godown Under are required" });
    }

    const uuid = uuidv4();
    const status = "Active";
    const mswc_id = await MSWC.getNextId();

    await MSWC.add({ uuid, godownName, godownUnder, mswc_id, status });
    updateTableStats('mswc_godowns');

    res.status(201).json({ message: "Godown added successfully", uuid, mswc_id, status });
  } catch (error) {
    console.error("Error adding godown:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update MSWC Godown**
exports.updateGodown = async (req, res) => {
  try {
    const { godownName, godownUnder, status } = req.body;

    if (!godownName) {
      return res.status(400).json({ error: "Godown name is required" });
    }

    const updatedStatus = status || "Active";

    const result = await MSWC.update(req.params.uuid, { godownName, godownUnder, status: updatedStatus });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
      updateTableStats('mswc_godowns');
    }
    res.json({ message: "Godown updated successfully" });
  } catch (error) {
    console.error("Error updating godown:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Soft Delete MSWC Godown**
exports.deleteGodown = async (req, res) => {
  try {
    const result = await MSWC.softDelete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    updateTableStats('mswc_godowns');
    res.json({ message: "Godown status updated to Inactive successfully!" });
  } catch (error) {
    console.error("Error deleting godown:", error);
    res.status(500).json({ error: "Failed to update godown status" });
  }
};

// **Get Godowns Unified (Filtered by Status)**
exports.getGodownsUnified = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, nopagination } = req.query;
    const pageNum = parseInt(page);
    const limitNum = nopagination === "true" ? 99999 : parseInt(limit);
    const offset = nopagination === "true" ? 0 : (pageNum - 1) * limitNum;

    const [godowns, total] = await Promise.all([
      MSWC.fetch({ status, limit: limitNum, offset }),
      MSWC.fetchCount({ status })
    ]);

    const response = {
      data: godowns,
    };

    if (nopagination !== "true") {
      response.pagination = {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      };
    }

    res.json(response);
  } catch (error) {
    console.error("Error fetching godowns unified:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Toggle Godown Status (Active <-> Inactive)**
exports.toggleGodownStatus = async (req, res) => {
  try {
    const result = await MSWC.toggleStatus(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    updateTableStats('mswc_godowns');
    res.json({ message: "Godown status toggled successfully!" });
  } catch (error) {
    console.error("Error toggling godown status:", error);
    res.status(500).json({ error: "Failed to toggle godown status" });
  }
};