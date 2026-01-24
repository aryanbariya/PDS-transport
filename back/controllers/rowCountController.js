const RowCount = require("../models/rowCountModel");

/**
 * Cache management for row counts
 * Ultra-fast query from table_statistics + caching
 */
let cachedData = null;
let cacheTime = null;
const CACHE_TTL = 30000; // 30 seconds cache validity

/**
 * Get Row Counts and Last Modified Timestamps
 * Returns structured data with all table counts and last modification times
 * Uses ultra-fast table_statistics query + 30sec caching
 */
exports.getRowCounts = async (req, res) => {
  try {
    const now = Date.now();
    
    // Check if cache is still valid
    if (cachedData && (now - cacheTime) < CACHE_TTL) {
      console.log(`[CACHE HIT] Returning cached data (age: ${now - cacheTime}ms)`);
      return res.status(200).json(cachedData);
    }
    
    console.log("[FRESH QUERY] Fetching from table_statistics");
    const rawData = await RowCount.getCountsAndTimestamps();
    cachedData = RowCount.transformResponse(rawData);
    cacheTime = now;
    
    res.status(200).json(cachedData);
  } catch (error) {
    console.error("Error fetching row counts and timestamps:", error.message);
    res.status(500).json({ 
      error: "Internal Server Error",
      message: error.message 
    });
  }
};