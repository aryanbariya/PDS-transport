const db = require("../config/db");

class Alloc {
  // Get paginated allocations
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM do_entries ORDER BY id DESC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total allocations count
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM do_entries";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      });
    });
  }

  // Get allocation by ID
  static getById(do_allocate_id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM do_alloc WHERE do_allocate_id = ?";
      db.query(sql, [do_allocate_id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }
}

module.exports = Alloc;