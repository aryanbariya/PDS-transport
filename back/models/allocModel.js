const db = require("../config/db");

class Alloc {
  // Get all allocations
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM do_entries ORDER BY id DESC";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
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