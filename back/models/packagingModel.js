const db = require("../config/db");

class Packaging {
  // Get all packaging materials
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, pack_id, material_name, weight, status FROM packaging ORDER BY pack_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get packaging material by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, pack_id, material_name, weight, status FROM packaging WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new packaging material
  static add({ uuid, material_name, weight, status, pack_id }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO packaging (uuid, material_name, weight, status, pack_id) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [uuid, material_name, weight, status, pack_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next packaging ID
  static getNextPackId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(pack_id), 0) + 1 AS next_pack_id FROM packaging";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_pack_id);
      });
    });
  }

  // Update a packaging material
  static update(uuid, { material_name, weight, status }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE packaging SET material_name = ?, weight = ?, status = ? WHERE uuid = ?";
      db.query(sql, [material_name, weight, status, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Delete a packaging material
  static delete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM packaging WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Reset packaging IDs
  static resetPackIds() {
    return new Promise((resolve, reject) => {
      const resetSql1 = "SET @new_pack_id = 0";
      const resetSql2 = "UPDATE packaging SET pack_id = (@new_pack_id := @new_pack_id + 1) ORDER BY pack_id";

      db.query(resetSql1, (err1) => {
        if (err1) return reject(err1);
        db.query(resetSql2, (err2) => {
          if (err2) return reject(err2);
          resolve();
        });
      });
    });
  }
}

module.exports = Packaging;