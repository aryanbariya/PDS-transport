const db = require("../config/db");

class Owner {
  // Get paginated owners
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, ownerName, contact, address, emailID, owner_id, status FROM owners ORDER BY owner_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total records count for pagination
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM owners";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get owner by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, ownerName, contact, address, emailID, owner_id, status FROM owners WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new owner
  static add({ uuid, ownerName, contact, address, emailID, owner_id, status = 'Active' }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO owners (uuid, ownerName, contact, address, emailID, owner_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, [uuid, ownerName, contact, address, emailID, owner_id, status], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next owner ID
  static getNextOwnerId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(owner_id), 0) + 1 AS next_owner_id FROM owners";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_owner_id);
      });
    });
  }

  // Update an owner
  static update(uuid, updates) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE owners SET ${updates.fields.join(", ")} WHERE uuid = ?`;
      db.query(sql, [...updates.values, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Delete an owner
  static delete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM owners WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Reset owner IDs
  static resetOwnerIds() {
    return new Promise((resolve, reject) => {
      const resetSql1 = "SET @new_id = 0";
      const resetSql2 = "UPDATE owners SET owner_id = (@new_id := @new_id + 1) ORDER BY owner_id";

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

module.exports = Owner;