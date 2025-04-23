const RowCount = require("../models/rowCountModel");

// **Get Row Counts and Last Modified Timestamps**
exports.getRowCounts = async (req, res) => {
  try {
    const counts = await RowCount.getCountsAndTimestamps();

    // Function to format timestamps into a readable format
    const formatDateTime = (timestamp) => {
      return timestamp
        ? new Date(timestamp).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata", // Convert to IST (India Standard Time)
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : "N/A"; // If NULL, return "N/A"
    };

    res.json({
      ownercount: counts.table1_count,
      employeecount: counts.table2_count,
      mswccount: counts.table3_count,
      godowncount: counts.table4_count,
      truckcount: counts.table6_count,
      schemecount: counts.table7_count,
      packagingcount: counts.table8_count,
      drivercount: counts.table9_count,
      graincount: counts.table10_count,
      categorycount: counts.table11_count,

      lastModifiedOwners: formatDateTime(counts.last_modified_owners),
      lastModifiedEmployee: formatDateTime(counts.last_modified_employee),
      lastModifiedMSWC: formatDateTime(counts.last_modified_mswc),
      lastModifiedSubGodown: formatDateTime(counts.last_modified_sub_godown),
      lastModifiedTruck: formatDateTime(counts.last_modified_truck),
      lastModifiedScheme: formatDateTime(counts.last_modified_scheme),
      lastModifiedPackaging: formatDateTime(counts.last_modified_packaging),
      lastModifieddriver: formatDateTime(counts.last_modified_drivers),
      lastModifiedGrain: formatDateTime(counts.last_modified_grains),
      lastModifiedCategory: formatDateTime(counts.last_modified_categories),
    });
  } catch (error) {
    console.error("Error fetching row counts and timestamps:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};