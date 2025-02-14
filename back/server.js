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
const secretKey = process.env.JWT_SECRET || "be5c701d7b261e7cec659a9e361dcded66544da8c1c0930ac57a600d8fbba17f9895fd3f173c1f11608ef295c7ddce94c27338d94e39365ccb35069c18587a1933da8d3c608aa2d2f22a4bee67c55ce14cae2f82a735f4b406a576ec23088cdd0b2682fda5da3f1a4aaddf5f57e804f59773f625c2684dc830b5f42dbc60df496c03994665b46b73fb6a0829e4ac3d7e017fcdaed512288e9ce72eb88726a473bab260d1729e874b988d8c6217e3c8003cf9701b97cc3b2d0299c8fbbace8846e74fcc472536bc04866b2d6ff081c4752e221cf84303cf7da1f4ce0905fced8d";

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
app.post("/employees", async (req, res) => {
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
app.get("/employees", (req, res) => {
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
app.delete("/employees/:id", (req, res) => {
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

// Fetch all godowns
app.get("/mswcgodown", (req, res) => {
  db.query("SELECT * FROM mswcgodown", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


app.post("/mswcgodown", (req, res) => {
  console.log("Received Data:", req.body); // Debug log

  const { godownName, godownUnder } = req.body;
  if (!godownName || !godownUnder) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the godown already exists before inserting
  const checkSql = "SELECT * FROM mswcgodown WHERE godownName = ?";
  db.query(checkSql, [godownName], (err, results) => {
    if (err) {
      console.error("Error checking existing data:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Godown already exists" });
    }

    // Insert only if no duplicate exists
    const insertSql = "INSERT INTO mswcgodown (godownName, godownUnder) VALUES (?, ?)";
    db.query(insertSql, [godownName, godownUnder], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      console.log("Inserted Data ID:", result.insertId);
      res.status(201).json({ message: "Godown added successfully", id: result.insertId });
    });
  });
});





// Delete a godown
app.delete("/mswcgodown/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM mswcgodown WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Godown deleted successfully" });
  });
});

app.post("/subgodown", (req, res) => {
  const { subGodownName, subGodownUnder } = req.body;

  if (!subGodownName || !subGodownUnder) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sqlQuery = "INSERT INTO subgodown (subGodownName, subGodownUnder) VALUES (?, ?)";
  
  db.query(sqlQuery, [subGodownName, subGodownUnder], (err, result) => {
    if (err) {
      console.error("Sub-Godown Insert Error:", err);
      return res.status(500).json({ error: "Server error: " + err.message });
    }
    res.status(201).json({ message: "Sub-Godown added successfully", id: result.insertId });
  });
});
app.get("/subgodown", (req, res) => {
  const sqlQuery = "SELECT * FROM subgodown";

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Sub-Godown Fetch Error:", err);
      return res.status(500).json({ error: "Server error: " + err.message });
    }
    res.status(200).json(results);
  });
});
app.delete("/subgodown/:id", (req, res) => {
  const subGodownId = req.params.id;

  const sqlQuery = "DELETE FROM subgodown WHERE id = ?";
  
  db.query(sqlQuery, [subGodownId], (err, result) => {
    if (err) {
      console.error("Sub-Godown Delete Error:", err);
      return res.status(500).json({ error: "Failed to delete Sub-Godown: " + err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sub-Godown not found" });
    }

    res.status(200).json({ message: "Sub-Godown deleted successfully" });
  });
});

// **Server Listening**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

