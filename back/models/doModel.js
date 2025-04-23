const db = require("../config/db");

class DO {
  // Get all DO records
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT stock_id, do_no, scheme_id, cota, do_date, godown_id, grain_id, quintal, quantity, total_amount, expire_date FROM do ORDER BY do_no DESC";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get DO record by DO number
  static getByNumber(doNo) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM do WHERE do_no = ?";
      db.query(sql, [doNo], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Get DO entries by DO ID
  static getEntriesByDOId(doNo) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM do_entries WHERE do_id = ?";
      db.query(sql, [doNo], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new DO record
  static addDO(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO do (do_no, godown_id, do_date, cota, scheme_id, grain_id, quantity, quintal, total_amount, expire_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(sql, data, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Add DO entries
  static addEntries(doNo, godownStr, vahtukStr, quantityStr) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO do_entries (do_id, godown, vahtuk, quantity)
        VALUES (?, ?, ?, ?)
      `;
      db.query(sql, [doNo, godownStr, vahtukStr, quantityStr], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Update a DO record
  static updateDO(stock_id, data) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE do 
        SET do_no = ?, godown_id = ?, do_date = ?, cota = ?, scheme_id = ?, grain_id = ?, quantity = ?
        WHERE stock_id = ?
      `;
      db.query(sql, [...data, stock_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Update DO entries
  static updateEntries(doNo, godownStr, vahtukStr, quantityStr) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE do_entries
        SET godown = ?, vahtuk = ?, quantity = ?
        WHERE do_id = ?
      `;
      db.query(sql, [godownStr, vahtukStr, quantityStr, doNo], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get all MSWC godowns
  static getAllMSWCGodowns() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = DO;