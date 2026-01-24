const mysql = require("mysql2");
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 2, // Extreme low limit to stay safe within 5
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  idleTimeout: 30000, // Close idle connections after 30s
  maxIdle: 2, // Max idle connections
  timezone: '+05:30'
});

// Use the promise-based wrapper if needed, or stick to standard pool
// For now, we'll keep it as a standard pool but add a convenience query method
const db = pool;

// Set session timezone on every new connection
pool.on('acquire', function (connection) {
  connection.query("SET time_zone = '+05:30'", (err) => {
    if (err) console.error("Error setting session timezone:", err);
  });
});

module.exports = db;