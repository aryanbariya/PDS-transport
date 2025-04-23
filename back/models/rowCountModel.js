const db = require("../config/db");

class RowCount {
  // Get row counts and last modified timestamps
  static getCountsAndTimestamps() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM owners) AS table1_count,
          (SELECT COUNT(*) FROM employee) AS table2_count,
          (SELECT COUNT(*) FROM mswc_godowns) AS table3_count,
          (SELECT COUNT(*) FROM sub_godown) AS table4_count,
          (SELECT COUNT(*) FROM truck) AS table6_count,
          (SELECT COUNT(*) FROM scheme) AS table7_count,
          (SELECT COUNT(*) FROM packaging) AS table8_count,
          (SELECT COUNT(*) FROM drivers) AS table9_count,
          (SELECT COUNT(*) FROM grains) AS table10_count,
          (SELECT COUNT(*) FROM categories) AS table11_count,
          
          (SELECT MAX(last_modified) FROM owners) AS last_modified_owners,
          (SELECT MAX(last_modified) FROM employee) AS last_modified_employee,
          (SELECT MAX(last_modified) FROM mswc_godowns) AS last_modified_mswc,
          (SELECT MAX(last_modified) FROM sub_godown) AS last_modified_sub_godown,
          (SELECT MAX(last_modified) FROM truck) AS last_modified_truck,
          (SELECT MAX(last_modified) FROM scheme) AS last_modified_scheme,
          (SELECT MAX(last_modified) FROM packaging) AS last_modified_packaging,
          (SELECT MAX(last_modified) FROM drivers) AS last_modified_drivers,
          (SELECT MAX(last_modified) FROM grains) AS last_modified_grains,
          (SELECT MAX(last_modified) FROM categories) AS last_modified_categories
      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first row of results
      });
    });
  }
}

module.exports = RowCount;