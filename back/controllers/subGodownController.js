const { v4: uuidv4 } = require("uuid");
const SubGodown = require("../models/subGodownModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get Active Sub-Godowns**
exports.getActiveSubGodowns = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const subGodowns = await SubGodown.getActive(99999, 0);
      return res.json(subGodowns);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [subGodowns, total] = await Promise.all([
      SubGodown.getActive(limit, offset),
      SubGodown.getActiveCount()
    ]);

    res.json({
      data: subGodowns,
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

// **Get Inactive Sub-Godowns**
exports.getInactiveSubGodowns = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const subGodowns = await SubGodown.getInactive(99999, 0);
      return res.json(subGodowns);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [subGodowns, total] = await Promise.all([
      SubGodown.getInactive(limit, offset),
      SubGodown.getInactiveCount()
    ]);

    res.json({
      data: subGodowns,
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
    if (req.query.nopagination === "true") {
      const subGodowns = await SubGodown.getAll(99999, 0);
      return res.json(subGodowns);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [subGodowns, total] = await Promise.all([
      SubGodown.getAll(limit, offset),
      SubGodown.getCount()
    ]);

    res.json({
      data: subGodowns,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
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
    updateTableStats('sub_godown');

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
    updateTableStats('sub_godown');
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
    updateTableStats('sub_godown');
    res.json({ message: "Godown status updated to Inactive successfully!" });
  } catch (error) {
    console.error("Error deleting sub-godown:", error);
    res.status(500).json({ error: "Failed to update godown status" });
  }
};

// **Get Sub-Godowns Unified (Filtered by Status)**
exports.getSubGodownsUnified = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, nopagination } = req.query;
    const pageNum = parseInt(page);
    const limitNum = nopagination === "true" ? 99999 : parseInt(limit);
    const offset = nopagination === "true" ? 0 : (pageNum - 1) * limitNum;

    const [subGodowns, total] = await Promise.all([
      SubGodown.fetch({ status, limit: limitNum, offset }),
      SubGodown.fetchCount({ status })
    ]);

    const response = {
      data: subGodowns,
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
    console.error("Error fetching sub-godowns unified:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Toggle Sub-Godown Status (Active <-> Inactive)**
exports.toggleSubGodownStatus = async (req, res) => {
  try {
    const result = await SubGodown.toggleStatus(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    updateTableStats('sub_godown');
    res.json({ message: "Godown status toggled successfully!" });
  } catch (error) {
    console.error("Error toggling sub-godown status:", error);
    res.status(500).json({ error: "Failed to toggle sub-godown status" });
  }
};