const db = require("../config/db");

class Grain {
  // Get all grains
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM grains ORDER BY grain_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get grain by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM grains WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new grain
  static add({ uuid, grainName, godownName, grain_id }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO grains (uuid, grainName, godownName, grain_id) VALUES (?, ?, ?, ?)";
      db.query(sql, [uuid, grainName, godownName, grain_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next grain ID
  static getNextGrainId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(grain_id), 0) + 1 AS next_id FROM grains";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_id);
      });
    });
  }

  // Update a grain
  static update(uuid, { grainName, godownName }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE grains SET grainName = ?, godownName = ? WHERE uuid = ?";
      db.query(sql, [grainName, godownName, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Delete a grain
  static delete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM grains WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Reset grain IDs
  static resetGrainIds() {
    return new Promise((resolve, reject) => {
      const resetSql1 = "SET @new_id = 0";
      const resetSql2 = "UPDATE grains SET grain_id = (@new_id := @new_id + 1) ORDER BY grain_id";

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

module.exports = Grain;