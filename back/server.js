const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// JWT Secret Key
const secretKey = process.env.JWT_SECRET || "your-secure-secret-key";

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

// // Create Employee Table (if not exists)
// db.query(`
//   CREATE TABLE IF NOT EXISTS employees (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     category VARCHAR(50),
//     fullName VARCHAR(100),
//     username VARCHAR(50),
//     password VARCHAR(255),
//     address TEXT,
//     aadharNo VARCHAR(20),
//     panNo VARCHAR(20),
//     bankName VARCHAR(100),
//     accountNumber VARCHAR(50),
//     ifscCode VARCHAR(20),
//     branchName VARCHAR(100),
//     subGodown VARCHAR(100)
//   )
// `, (err) => {
//   if (err) console.error("Error creating employees table:", err);
// });

// // Create Users Table (for Authentication)
// db.query(`
//   CREATE TABLE IF NOT EXISTS signup (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     surname VARCHAR(100),
//     phone_number VARCHAR(20),
//     email VARCHAR(100) UNIQUE,
//     password VARCHAR(255)
//   )
// `, (err) => {
//   if (err) console.error("Error creating users table:", err);
// });

// **Signup API**
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

// **Login API**
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
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(500).json({ error: "Error comparing passwords" });
    }
  });
});

// **Insert Employee Data API**
app.post("/api/employees", async (req, res) => {
  try {
    const { category, fullName, username, password, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown } = req.body;

    if (!category || !fullName || !username || !password || !aadharNo || !panNo || !bankName || !accountNumber || !ifscCode || !branchName || !subGodown) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO employees (category, fullName, username, password, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [category, fullName, username, hashedPassword, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown], (err, result) => {
      if (err) {
        console.error("Error inserting employee data:", err);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({ message: "Employee added successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// **Get All Employees API**
app.get("/api/employees", (req, res) => {
  const sql = "SELECT id, category, fullName, username, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown FROM employees";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }
    res.status(200).json(results);
  });
});

// **Delete Employee API**
app.delete("/api/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = "DELETE FROM employees WHERE id = ?";
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "Failed to delete employee" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  });
});

// **Insert Godown Data**
app.post("/api/mswcgodown", async (req, res) => {
  try {
    const { godownName, godownUnder } = req.body;

    if (!godownName || !godownUnder) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sqlQuery = "INSERT INTO mswcgodown (godownName, godownUnder) VALUES (@godownName, @godownUnder)";
    const request = new sql.Request();
    request.input("godownName", sql.VarChar, godownName);
    request.input("godownUnder", sql.VarChar, godownUnder);

    await request.query(sqlQuery);
    res.status(201).json({ message: "Godown added successfully" });

  } catch (error) {
    console.error("Godown Insert Error:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// **Fetch Godown Data**
app.get("/api/mswcgodown", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM mswcgodown");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Godown Fetch Error:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// **Delete Godown API**
app.delete("/api/mswcgodown/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = "DELETE FROM employees WHERE id = ?";
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "Failed to delete employee" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  });
});

// **Insert Sub-Godown Data**
app.post("/api/subgodown", async (req, res) => {
  try {
    const { subGodownName, subGodownUnder } = req.body;

    if (!subGodownName || !subGodownUnder) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sqlQuery =
      "INSERT INTO subgodown (subGodownName, subGodownUnder) VALUES (@subGodownName, @subGodownUnder)";
    const request = new sql.Request();
    request.input("subGodownName", sql.VarChar, subGodownName);
    request.input("subGodownUnder", sql.VarChar, subGodownUnder);

    await request.query(sqlQuery);
    res.status(201).json({ message: "Sub-Godown added successfully" });

  } catch (error) {
    console.error("Sub-Godown Insert Error:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// **Fetch Sub-Godown Data**
app.get("/api/subgodown", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM subgodown");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Sub-Godown Fetch Error:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// **Delete Sub-Godown API**
app.delete("/api/subgodown/:id", async (req, res) => {
  try {
    const subGodownId = req.params.id;
    const sqlQuery = "DELETE FROM subgodown WHERE id = @subGodownId";
    
    const request = new sql.Request();
    request.input("subGodownId", sql.Int, subGodownId);
    
    await request.query(sqlQuery);
    res.status(200).json({ message: "Sub-Godown deleted successfully" });

  } catch (error) {
    console.error("Sub-Godown Delete Error:", error);
    res.status(500).json({ error: "Failed to delete Sub-Godown: " + error.message });
  }
});

// **Server Listening**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


