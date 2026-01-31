const db = require("../config/db");

class Employee {
  // Get all categories
  static getCategories() {
    return new Promise((resolve, reject) => {
      const query = "SELECT category_name FROM categories WHERE status = 'Active'";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all sub-godowns
  static getSubGodowns() {
    return new Promise((resolve, reject) => {
      const query = "SELECT subGodown FROM sub_godown WHERE status = 'Active' ORDER BY subgodown_id ASC";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get paginated employees
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, category, fullName, username, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown, contact, order_number FROM employee ORDER BY order_number ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total employees count
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM employee";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get employee by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, category, fullName, username, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown, contact, order_number FROM employee WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new employee
  static add(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO employee (uuid, category, fullName, username, password, subGodown, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, contact, order_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, data, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next order number for employees
  static getNextOrderNumber() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM employee";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_order);
      });
    });
  }

  // Update an employee
  // Employee.js (model)
  static update(uuid, updates) {
    return new Promise((resolve, reject) => {
      // Only include keys with defined (non-null) values
      const fields = Object.keys(updates).filter(key => updates[key] !== undefined && updates[key] !== null);

      // If no fields to update, reject
      if (fields.length === 0) {
        return reject(new Error("No valid fields to update"));
      }

      // Build SQL SET clause dynamically: e.g., "fullName = ?, address = ?"
      const setClause = fields.map(field => `${field} = ?`).join(", ");
      const sql = `UPDATE employee SET ${setClause} WHERE uuid = ?`;

      const values = fields.map(field => updates[field]);

      db.query(sql, [...values, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }



  // Delete an employee
  static delete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM employee WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Reset order numbers
  static resetOrderNumbers() {
    return new Promise((resolve, reject) => {
      const resetSql1 = "SET @new_order = 0";
      const resetSql2 = "UPDATE employee SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

      db.query(resetSql1, (err1) => {
        if (err1) return reject(err1);
        db.query(resetSql2, (err2) => {
          if (err2) return reject(err2);
          resolve();
        });
      });
    });
  }

  // Unified fetch with optional status filtering
  static fetch({ status, limit = 10, offset = 0 }) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT uuid, category, fullName, username, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown, contact, order_number, status FROM employee";
      const params = [];

      if (status) {
        sql += " WHERE status = ?";
        params.push(status);
      }

      sql += " ORDER BY order_number ASC LIMIT ? OFFSET ?";
      params.push(limit, offset);

      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Unified count with optional status filtering
  static fetchCount({ status }) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT COUNT(*) as total FROM employee";
      const params = [];

      if (status) {
        sql += " WHERE status = ?";
        params.push(status);
      }

      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Toggle employee status between Active and Inactive
  static toggleStatus(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE employee SET status = IF(status = 'Active', 'Inactive', 'Active') WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Employee;
