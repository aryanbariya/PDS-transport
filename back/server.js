const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // For generating tokens (optional)
const secretKey = "09fadddca878ce21ce1aa20fdccb024dbafedbed5efef820a3c20117bd4b9ef0ef979795b546f881e7fe29986eb3ce5ec6c62f4e22a2c07d855142be3c71e6ca273714ef09cdabc99f0297067343a9d7b71407c7ee886c086ef0bec7f1b58d296568b9bada09ee27311aa94b3650fcfc568b979f3b842468d8397c0b035733e850b62f72102116dcbcfbec5c26b800843a64c9f43523fc4ba8a7f771898ef31efcf1062ff8cda6bcb757a694d6ff31ad5f51604d42c03a87a59afc36ccfc9ae1cb19a52753c9898b9524a316509f35cdaa3d8bc8b2edf6e7cf8d027c882866b6"; // Change this to a secure key
require("dotenv").config();

// Start Server
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pdsmanagement",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Signup API Route
app.post("/signup", async (req, res) => {
  try {
    const { name, surname, phone_number, email, password } = req.body;
    
    if (!name || !surname || !phone_number || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO signup (name, surname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, surname, phone_number, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error: " + err });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// signin/Login API Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM signup WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database error: " + err });
      }

      if (results.length === 0) {
          return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      try {
          // Ensure bcrypt.compare is awaited inside try-catch
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
              return res.status(401).json({ error: "Invalid email or password" });
          }

          // Generate a token (optional)
          const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

          res.status(200).json({ message: "Login successful", token, user });
      } catch (error) {
          res.status(500).json({ error: "Error comparing passwords" });
      }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
