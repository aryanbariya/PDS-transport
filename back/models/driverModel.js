const db = require("../config/db");

class Driver {
  // Get all active drivers
  static getActive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id FROM drivers WHERE status = 'Active' ORDER BY driver_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all inactive drivers
  static getInactive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id FROM drivers WHERE status = 'Inactive' ORDER BY driver_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all drivers
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id FROM drivers ORDER BY driver_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get driver by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM drivers WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new driver
  static add({ uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO drivers (uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(sql, [uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next driver ID
  static getNextDriverId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(driver_id), 0) + 1 AS next_order FROM drivers";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_order);
      });
    });
  }

  // Update a driver
  static update(uuid, updates) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE drivers SET ${updates.fields.join(", ")} WHERE uuid = ?`;
      db.query(sql, [...updates.values, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Soft delete a driver
  static softDelete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE drivers SET status = 'Inactive' WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Driver;