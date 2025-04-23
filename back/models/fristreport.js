const db = require("../config/db");

const getFirstReportData = (callback) => {
  const query = `
    SELECT 
      transport.*, 
      do.*, 
      do_entries.*
    FROM transport
    JOIN do ON transport.doNo = do.stock_id
    JOIN do_entries ON do.do_no = do_entries.do_id
  `;

  db.query(query, callback);
};

module.exports = {
    getFirstReportData
};
