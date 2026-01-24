const db = require("../config/db");

class MSWC {
  // Get paginated active godowns
  static getActive(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns WHERE status = 'Active' ORDER BY mswc_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total active godowns count
  static getActiveCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM mswc_godowns WHERE status = 'Active'";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get paginated inactive godowns
  static getInactive(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns WHERE status = 'Inactive' ORDER BY mswc_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total inactive godowns count
  static getInactiveCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM mswc_godowns WHERE status = 'Inactive'";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get paginated godowns
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns ORDER BY mswc_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total godowns count
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM mswc_godowns";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get godown by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new godown
  static add({ uuid, godownName, godownUnder, mswc_id, status }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO mswc_godowns (uuid, godownName, godownUnder, mswc_id, status) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [uuid, godownName, godownUnder, mswc_id, status], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next MSWC ID
  static getNextId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(mswc_id), 0) + 1 AS next_id FROM mswc_godowns";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_id);
      });
    });
  }

  // Update a godown
  static update(uuid, { godownName, godownUnder, status }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE mswc_godowns SET godownName = ?, godownUnder = ?, status = ? WHERE uuid = ?";
      db.query(sql, [godownName, godownUnder, status, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Soft delete a godown
  static softDelete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE mswc_godowns SET status = 'Inactive' WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = MSWC;