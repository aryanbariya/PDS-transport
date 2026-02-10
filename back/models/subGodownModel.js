const db = require("../config/db");

class SubGodown {
  // Get paginated active sub-godowns
  static getActive(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown WHERE status = 'Active' ORDER BY subgodown_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total active sub-godowns count
  static getActiveCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM sub_godown WHERE status = 'Active'";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get paginated inactive sub-godowns
  static getInactive(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown WHERE status = 'Inactive' ORDER BY subgodown_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total inactive sub-godowns count
  static getInactiveCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM sub_godown WHERE status = 'Inactive'";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get all godowns
  static getAllGodowns() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT godownName FROM mswc_godowns WHERE status = 'Active'";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get paginated sub-godowns
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, status, subgodown_id FROM sub_godown ORDER BY subgodown_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total sub-godowns count
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM sub_godown";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get sub-godown by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, status, subgodown_id FROM sub_godown WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new sub-godown
  static add({ uuid, parentGodown, subGodown, status, subgodown_id }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO sub_godown (uuid, parentGodown, subGodown, status, subgodown_id) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [uuid, parentGodown, subGodown, status, subgodown_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next sub-godown ID
  static getNextSubGodownId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(subgodown_id), 0) + 1 AS next_order FROM sub_godown";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_order);
      });
    });
  }

  // Update a sub-godown
  static update(uuid, { parentGodown, subGodown, status }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE sub_godown SET parentGodown = ?, subGodown = ?, status = ? WHERE uuid = ?";
      db.query(sql, [parentGodown, subGodown, status, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Soft delete a sub-godown
  static softDelete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE sub_godown SET status = 'Inactive' WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Unified fetch with optional status filtering
  static fetch({ status, limit = 10, offset = 0 }) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown";
      const params = [];

      if (status) {
        sql += " WHERE status = ?";
        params.push(status);
      }

      sql += " ORDER BY subgodown_id ASC LIMIT ? OFFSET ?";
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
      let sql = "SELECT COUNT(*) as total FROM sub_godown";
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

  // Toggle sub-godown status between Active and Inactive
  static toggleStatus(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE sub_godown SET status = IF(status = 'Active', 'Inactive', 'Active') WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = SubGodown;