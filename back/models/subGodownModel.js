const db = require("../config/db");

class SubGodown {
  // Get all active sub-godowns
  static getActive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown WHERE status = 'Active' ORDER BY subgodown_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all inactive sub-godowns
  static getInactive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown WHERE status = 'Inactive' ORDER BY subgodown_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
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

  // Get all sub-godowns
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, parentGodown, subGodown, status, subgodown_id FROM sub_godown ORDER BY subgodown_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
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
}

module.exports = SubGodown;