const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const Employee = require("../models/employeeModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get All Categories**
exports.getCategories = async (req, res) => {
  try {
    const categories = await Employee.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Database query error" });
  }
};

// **Get All Sub-Godowns**
exports.getSubGodowns = async (req, res) => {
  try {
    const subGodowns = await Employee.getSubGodowns();
    res.json(subGodowns);
  } catch (error) {
    console.error("Error fetching sub-godowns:", error);
    res.status(500).json({ error: "Database query error" });
  }
};

// **Get All Employees**
exports.getEmployees = async (req, res) => {
  try {
    if (req.query.nopagination === "true") {
      const employees = await Employee.getAll(99999, 0);
      return res.json(employees);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [employees, total] = await Promise.all([
      Employee.getAll(limit, offset),
      Employee.getCount()
    ]);

    res.json({
      data: employees,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Employee by UUID**
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.getById(req.params.uuid);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Employee**
exports.addEmployee = async (req, res) => {
  try {
    const { category, fullName, username, password, subGodown, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, contact } = req.body;

    if (!category || !fullName || !username || !password || !subGodown) {
      return res.status(400).json({ error: "Required fields: category, fullName, username, password, subGodown" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const nextOrder = await Employee.getNextOrderNumber();

    await Employee.add([uuid, category, fullName, username, hashedPassword, subGodown, address || null, aadharNo || null, panNo || null, bankName || null, accountNumber || null, ifscCode || null, branchName || null, contact || null, nextOrder]);
    updateTableStats('employee');

    res.status(201).json({ message: "Employee added successfully", uuid, order_number: nextOrder });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Database insertion error" });
  }
};

// **Update Employee**
exports.updateEmployee = async (req, res) => {
  try {
    const {
      category, fullName, username, subGodown,
      address, aadharNo, panNo, bankName, accountNumber,
      ifscCode, branchName, password, contact
    } = req.body;

    // Required field check
    if (!category || !fullName || !username || !subGodown) {
      return res.status(400).json({ error: "Required fields: category, fullName, username, subGodown" });
    }

    // Construct updates object
    const updates = {
      category,
      fullName,
      username,
      subGodown,
      address,
      aadharNo,
      panNo,
      bankName,
      accountNumber,
      ifscCode,
      branchName,
      contact
    };

    // Only add hashed password if provided
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const result = await Employee.update(req.params.uuid, updates);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    updateTableStats('employee');

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Database update error" });
  }
};


// **Delete Employee**
exports.deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.delete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await Employee.resetOrderNumbers();
    updateTableStats('employee');
    res.json({ message: "Employee deleted and order numbers reset successfully!" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Database deletion error" });
  }
};

// **Get Employees Unified (Filtered by Status)**
exports.getEmployeesUnified = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, nopagination } = req.query;
    const pageNum = parseInt(page);
    const limitNum = nopagination === "true" ? 99999 : parseInt(limit);
    const offset = nopagination === "true" ? 0 : (pageNum - 1) * limitNum;

    const [employees, total] = await Promise.all([
      Employee.fetch({ status, limit: limitNum, offset }),
      Employee.fetchCount({ status })
    ]);

    const response = {
      data: employees,
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
    console.error("Error fetching employees unified:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Toggle Employee Status (Active <-> Inactive)**
exports.toggleEmployeeStatus = async (req, res) => {
  try {
    const result = await Employee.toggleStatus(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    updateTableStats('employee');
    res.json({ message: "Employee status toggled successfully!" });
  } catch (error) {
    console.error("Error toggling employee status:", error);
    res.status(500).json({ error: "Failed to toggle employee status" });
  }
};
