const db = require("../config/db");

class Truck {
  
  static getAllTrucksByOwner () {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, ownerName, owner_id FROM owners ORDER BY owner_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  // Get all trucks
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id FROM truck ORDER BY truck_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all active trucks
  static getActive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id FROM truck WHERE truck_status = 'Active' ORDER BY truck_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all inactive trucks
  static getInactive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id FROM truck WHERE truck_status = 'Inactive' ORDER BY truck_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get truck by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM truck WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new truck
  static add(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO truck (uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, data, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next truck ID
  static getNextTruckId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(truck_id), 0) + 1 AS next_order FROM truck";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_order);
      });
    });
  }

  // Update a truck
  static update(uuid, updates) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE truck SET ${updates.fields.join(", ")} WHERE uuid = ?`;
      db.query(sql, [...updates.values, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Soft delete a truck
  static softDelete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE truck SET truck_status = 'Inactive' WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Truck;