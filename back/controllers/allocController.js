const Alloc = require("../models/allocModel");

// **Get All Allocations**
exports.getAllAllocations = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const allocations = await Alloc.getAll(99999, 0);
      return res.json(allocations);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [allocations, total] = await Promise.all([
      Alloc.getAll(limit, offset),
      Alloc.getCount()
    ]);

    res.json({
      data: allocations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
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