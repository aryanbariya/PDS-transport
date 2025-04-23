const db = require("../config/db");

class Transport {
  // Get all active transport records
  static getActive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM transport WHERE status = 'Active' ORDER BY trans_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all inactive transport records
  static getInactive() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM transport WHERE status = 'Inactive' ORDER BY trans_id";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get all transport records
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          t.*,
          f.do_no AS donumber,
          bd.godownName AS baseDepoName,
          g.subGodown AS godownName,
          tr.truck_name AS truckName,
          o.ownerName AS ownerName,
          d.driver_name AS driverName,
          s.scheme_name AS schemeName,
          p.material_name AS packagingName
        FROM transport t
        LEFT JOIN do f ON t.doNo = f.stock_id
        LEFT JOIN mswc_godowns bd ON t.baseDepo = bd.mswc_id
        LEFT JOIN sub_godown g ON t.godown = g.subgodown_id
        LEFT JOIN truck tr ON t.truck = tr.truck_id
        LEFT JOIN owners o ON t.owner = o.owner_id
        LEFT JOIN drivers d ON t.driver = d.driver_id
        LEFT JOIN scheme s ON t.scheme = s.scheme_id
        LEFT JOIN packaging p ON t.packaging = p.pack_id
        ORDER BY t.trans_id DESC
      `;
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get transport record by UUID
  static getById(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM transport WHERE uuid = ?";
      db.query(sql, [uuid], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new transport record
  static add(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO transport 
        (uuid, trans_id, baseDepo, doNo, godown, truck, owner, driver, emptyWeight, 
        grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, 
        netWeight, dispatchDate, quota, tpNo, allocation, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(sql, data, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Get the next transport ID
  static getNextTransId() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COALESCE(MAX(trans_id), 0) + 1 AS next_trans_id FROM transport";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].next_trans_id);
      });
    });
  }

  // Update a transport record
  static update(uuid, updates) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE transport SET ${updates.fields.join(", ")} WHERE uuid = ?`;
      db.query(sql, [...updates.values, uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Soft delete a transport record
  static softDelete(uuid) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE transport SET status = 'Inactive' WHERE uuid = ?";
      db.query(sql, [uuid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Transport;