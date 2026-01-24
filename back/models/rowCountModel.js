const db = require("../config/db");

class RowCount {
  /**
   * Get row counts and last modified timestamps for all tables
   * ULTRA-FAST: Queries from pre-computed table_statistics table
   * @returns {Promise} Object containing all counts and timestamps
   */
  static getCountsAndTimestamps() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM table_statistics`;
      
      db.query(query, (err, results) => {
        if (err) {
          console.error("RowCount query error:", err);
          return reject(new Error("Failed to fetch row counts: " + err.message));
        }
        
        if (!results || results.length === 0) {
          return reject(new Error("No results returned from database"));
        }
        
        // Transform array of rows into mapped object
        const statsMap = {};
        results.forEach(row => {
          statsMap[row.table_name] = row;
        });
        
        resolve(statsMap); // Return mapped data
      });
    });
  }

  /**
   * Format timestamp to readable IST format
   * @param {Date|string|null} timestamp - The timestamp to format
   * @returns {string} Formatted datetime or "N/A"
   */
  static formatTimestamp(timestamp) {
    if (!timestamp) return "N/A";
    
    try {
      return new Date(timestamp).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (error) {
      console.error("Timestamp formatting error:", error);
      return "N/A";
    }
  }

  /**
   * Transform raw database result to formatted response (backward compatible with frontend)
   * @param {Object} statsMap - Mapped data from table_statistics
   * @returns {Object} Formatted response object matching frontend expectations
   */
  static transformResponse(statsMap) {
    return {
      ownercount: statsMap.owners?.row_count || 0,
      employeecount: statsMap.employee?.row_count || 0,
      mswccount: statsMap.mswc_godowns?.row_count || 0,
      godowncount: statsMap.sub_godown?.row_count || 0,
      truckcount: statsMap.truck?.row_count || 0,
      schemecount: statsMap.scheme?.row_count || 0,
      packagingcount: statsMap.packaging?.row_count || 0,
      drivercount: statsMap.drivers?.row_count || 0,
      graincount: statsMap.grains?.row_count || 0,
      categorycount: statsMap.categories?.row_count || 0,
      
      lastModifiedOwners: this.formatTimestamp(statsMap.owners?.last_modified),
      lastModifiedEmployee: this.formatTimestamp(statsMap.employee?.last_modified),
      lastModifiedMSWC: this.formatTimestamp(statsMap.mswc_godowns?.last_modified),
      lastModifiedSubGodown: this.formatTimestamp(statsMap.sub_godown?.last_modified),
      lastModifiedTruck: this.formatTimestamp(statsMap.truck?.last_modified),
      lastModifiedScheme: this.formatTimestamp(statsMap.scheme?.last_modified),
      lastModifiedPackaging: this.formatTimestamp(statsMap.packaging?.last_modified),
      lastModifieddriver: this.formatTimestamp(statsMap.drivers?.last_modified),
      lastModifiedGrain: this.formatTimestamp(statsMap.grains?.last_modified),
      lastModifiedCategory: this.formatTimestamp(statsMap.categories?.last_modified),
    };
  }
}

module.exports = RowCount;