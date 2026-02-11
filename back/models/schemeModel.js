const db = require("../config/db");

class Scheme {
  // Get paginated schemes
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, scheme_id, scheme_name, scheme_status FROM scheme ORDER BY scheme_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total schemes count
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM scheme";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get scheme by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, scheme_id, scheme_name, scheme_status FROM scheme WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new scheme
  static add({ uuid, scheme_name, scheme_status, scheme_id }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO scheme (uuid, scheme_name, scheme_status, scheme_id) VALUES (?, ?, ?, ?)";
      db.query(sql, [uuid, scheme_name, scheme_status, scheme_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next scheme ID
  static getNextSchemeId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(scheme_id), 0) + 1 AS next_scheme_id FROM scheme";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_scheme_id);
      });
    });
  }

  // Update a scheme
  static update(uuid, { scheme_name, scheme_status }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE scheme SET scheme_name = ?, scheme_status = ? WHERE uuid = ?";
      db.query(sql, [scheme_name, scheme_status, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Delete a scheme
  static delete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM scheme WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Reset scheme IDs
  static resetSchemeIds() {
    return new Promise((resolve, reject) => {
      const resetSql1 = "SET @new_scheme_id = 0";
      const resetSql2 = "UPDATE scheme SET scheme_id = (@new_scheme_id := @new_scheme_id + 1) ORDER BY scheme_id";

      db.query(resetSql1, (err1) => {
        if (err1) return reject(err1);
        db.query(resetSql2, (err2) => {
          if (err2) return reject(err2);
          resolve();
        });
      });
    });
  }

  // Get all schemes with optional status filter and pagination
  static getAllFiltered(limit = 10, offset = 0, status = null) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT uuid, scheme_id, scheme_name, scheme_status FROM scheme";
      const params = [];

      if (status) {
        sql += " WHERE scheme_status = ?";
        params.push(status);
      }

      sql += " ORDER BY scheme_id ASC LIMIT ? OFFSET ?";
      params.push(limit, offset);

      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get count of schemes with optional status filter
  static getCountFiltered(status = null) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT COUNT(*) as total FROM scheme";
      const params = [];

      if (status) {
        sql += " WHERE scheme_status = ?";
        params.push(status);
      }

      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }
}

module.exports = Scheme;