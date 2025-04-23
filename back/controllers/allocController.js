const Alloc = require("../models/allocModel");

// **Get All Allocations**
exports.getAllAllocations = async (req, res) => {
  try {
    const allocations = await Alloc.getAll();
    res.json(allocations);
  } catch (error) {
    console.error("Error fetching allocations:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Allocation by ID**
exports.getAllocationById = async (req, res) => {
  try {
    const allocation = await Alloc.getById(req.params.do_allocate_id);
    if (!allocation) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(allocation);
  } catch (error) {
    console.error("Error fetching allocation by ID:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};