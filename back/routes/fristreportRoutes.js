const express = require('express');
const router = express.Router();
const firstreportModel = require('../controllers/fristreportController');

router.get('/fristreport', firstreportModel.getFirstReportData);

module.exports = router;
