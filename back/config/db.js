const mysql = require("mysql2");
require("dotenv").config();

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  timezone: '+05:30' // Tells mysql2 how to handle JS Dates
});

// Set session timezone to IST on every connect
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  db.query("SET time_zone = '+05:30'", (err) => {
    if (err) console.error("Error setting session timezone:", err);
    else console.log("✓ Database session timezone set to IST (+05:30)");
  });
});

module.exports = db;