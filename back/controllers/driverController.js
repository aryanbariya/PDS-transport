const { v4: uuidv4 } = require("uuid");
const Driver = require("../models/driverModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get Active Drivers**
exports.getActiveDrivers = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const drivers = await Driver.getActive(99999, 0);
      return res.json(drivers);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [drivers, total] = await Promise.all([
      Driver.getActive(limit, offset),
      Driver.getActiveCount()
    ]);

    res.json({
      data: drivers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching active drivers:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Inactive Drivers**
exports.getInactiveDrivers = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const drivers = await Driver.getInactive(99999, 0);
      return res.json(drivers);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [drivers, total] = await Promise.all([
      Driver.getInactive(limit, offset),
      Driver.getInactiveCount()
    ]);

    res.json({
      data: drivers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching inactive drivers:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get All Drivers**
exports.getAllDrivers = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const drivers = await Driver.getAll(99999, 0);
      return res.json(drivers);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [drivers, total] = await Promise.all([
      Driver.getAll(limit, offset),
      Driver.getCount()
    ]);

    res.json({
      data: drivers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching all drivers:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Driver by UUID**
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.getById(req.params.uuid);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Driver**
exports.addDriver = async (req, res) => {
  try {
    const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;
    const uuid = uuidv4();
    const driver_id = await Driver.getNextDriverId();

    await Driver.add({ uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id });
    updateTableStats('drivers');

    res.json({ message: "Driver added successfully", uuid, driver_id, status });
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ error: "Database insertion error" });
  }
};

// **Update Driver**
exports.updateDriver = async (req, res) => {
  try {
    const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;

    if (!driver_name || driver_name.trim() === "") {
      return res.status(400).json({ error: "Driver name is required" });
    }

    let fields = [];
    let values = [];

    if (driver_name) {
      fields.push("driver_name = ?");
      values.push(driver_name);
    }
    if (aadhar_card_no) {
      fields.push("aadhar_card_no = ?");
      values.push(aadhar_card_no);
    }
    if (contact) {
      fields.push("contact = ?");
      values.push(contact);
    }
    if (driving_license_no) {
      fields.push("driving_license_no = ?");
      values.push(driving_license_no);
    }
    if (status) {
      fields.push("status = ?");
      values.push(status);
    }

    const updates = { fields, values };

    const result = await Driver.update(req.params.uuid, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    updateTableStats('drivers');
    res.json({ message: "Driver updated successfully" });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Soft Delete Driver**
exports.deleteDriver = async (req, res) => {
  try {
    const result = await Driver.softDelete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    updateTableStats('drivers');
    res.json({ message: "Driver status updated to Inactive successfully!" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ error: "Database deletion error" });
  }
};

// **Get Drivers Unified (Filtered by Status)**
exports.getDriversUnified = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, nopagination } = req.query;
    const pageNum = parseInt(page);
    const limitNum = nopagination === "true" ? 99999 : parseInt(limit);
    const offset = nopagination === "true" ? 0 : (pageNum - 1) * limitNum;

    const [drivers, total] = await Promise.all([
      Driver.fetch({ status, limit: limitNum, offset }),
      Driver.fetchCount({ status })
    ]);

    const response = {
      data: drivers,
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
    console.error("Error fetching drivers unified:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Toggle Driver Status (Active <-> Inactive)**
exports.toggleDriverStatus = async (req, res) => {
  try {
    const result = await Driver.toggleStatus(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    updateTableStats('drivers');
    res.json({ message: "Driver status toggled successfully!" });
  } catch (error) {
    console.error("Error toggling driver status:", error);
    res.status(500).json({ error: "Failed to toggle driver status" });
  }
};