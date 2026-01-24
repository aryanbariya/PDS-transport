const db = require("../config/db");

/**
 * Update table statistics after data modification
 * Automatically updates row_count and last_modified in table_statistics
 * 
 * @param {string} tableName - Name of the table (must match table_statistics.table_name)
 * @param {function} callback - Optional callback for error handling
 */
const updateTableStats = (tableName, callback) => {
  const query = `
    UPDATE table_statistics 
    SET 
      row_count = (SELECT COUNT(*) FROM ${tableName}),
      last_modified = (SELECT MAX(last_modified) FROM ${tableName})
    WHERE table_name = ?
  `;

  db.query(query, [tableName], (err) => {
    if (err) {
      console.error(`Error updating stats for ${tableName}:`, err);
      if (callback) callback(err);
    } else {
      console.log(`✓ Updated stats for: ${tableName}`);
      if (callback) callback(null);
    }
  });
};

module.exports = updateTableStats;
