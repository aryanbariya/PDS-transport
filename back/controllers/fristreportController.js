getFirstReportData

const firstreportModel = require('../models/fristreport');

const getFirstReportData = (req, res) => {
  firstreportModel.getFirstReportData((err, results) => {
    if (err) {
      console.error('Error fetching full transport data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  getFirstReportData
};
