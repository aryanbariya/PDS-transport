// const db = require("../config/db");

// const getFirstReportData = (callback) => {
//   const query = `
//     SELECT 
//       transport.*, 
//       do.*, 
//       do_entries.*
//     FROM transport
//     JOIN do ON transport.doNo = do.stock_id
//     JOIN do_entries ON do.do_no = do_entries.do_id
//   `;

//   db.query(query, callback);
// };

// module.exports = {
//     getFirstReportData
// };
const db = require("../config/db");

const getFirstReportData = (callback) => {
  const query = `
    SELECT 
      t.*, 
      f.*, 
      de.*, 

      f.do_no AS donumber,
      bd.godownName AS baseDepoName,
      g.subGodown AS godownName,
      tr.truck_name AS truckName,
      o.ownerName AS ownerName,
      d.driver_name AS driverName,
      s.scheme_name AS schemeName,
      p.material_name AS packagingName

    FROM transport t

    -- Join core DO and entry data
    LEFT JOIN do f ON t.doNo = f.stock_id
    LEFT JOIN do_entries de ON f.do_no = de.do_id

    -- Replace string ID references with human-readable names
    LEFT JOIN mswc_godowns bd ON t.baseDepo = bd.mswc_id
    LEFT JOIN sub_godown g ON t.godown = g.subgodown_id
    LEFT JOIN truck tr ON t.truck = tr.truck_id
    LEFT JOIN owners o ON t.owner = o.owner_id
    LEFT JOIN drivers d ON t.driver = d.driver_id
    LEFT JOIN scheme s ON t.scheme = s.scheme_id
    LEFT JOIN packaging p ON t.packaging = p.pack_id

    ORDER BY t.trans_id DESC
  `;

  db.query(query, callback);
};

module.exports = {
  getFirstReportData
};
