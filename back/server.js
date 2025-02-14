// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken"); // For generating tokens (optional)
// const secretKey = "09fadddca878ce21ce1aa20fdccb024dbafedbed5efef820a3c20117bd4b9ef0ef979795b546f881e7fe29986eb3ce5ec6c62f4e22a2c07d855142be3c71e6ca273714ef09cdabc99f0297067343a9d7b71407c7ee886c086ef0bec7f1b58d296568b9bada09ee27311aa94b3650fcfc568b979f3b842468d8397c0b035733e850b62f72102116dcbcfbec5c26b800843a64c9f43523fc4ba8a7f771898ef31efcf1062ff8cda6bcb757a694d6ff31ad5f51604d42c03a87a59afc36ccfc9ae1cb19a52753c9898b9524a316509f35cdaa3d8bc8b2edf6e7cf8d027c882866b6"; // Change this to a secure key
// require("dotenv").config();

// // Start Server
// const PORT = process.env.PORT || 5000;

// const app = express();
<<<<<<< HEAD
// app.use(cors());
=======
// app.use(cors({
//   origin: "http://localhost:5173", // Allow only frontend origin
//   credentials: true
// }));
>>>>>>> e932bf7 (emoloyee to database done)
// app.use(express.json());

// // MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
<<<<<<< HEAD
//   password: process.env.DB_PASSWORD || "",
=======
//   password: process.env.DB_PASS|| "",
>>>>>>> e932bf7 (emoloyee to database done)
//   database: process.env.DB_NAME || "pdsmanagement",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("Connected to MySQL database.");
// });

// // Signup API Route
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, surname, phone_number, email, password } = req.body;
    
//     if (!name || !surname || !phone_number || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = "INSERT INTO signup (name, surname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [name, surname, phone_number, email, hashedPassword], (err, result) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ error: "Database error: " + err });
//       }
//       res.status(201).json({ message: "User registered successfully" });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error: " + error.message });
//   }
// });

// // signin/Login API Route
// app.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM signup WHERE email = ?";
//   db.query(sql, [email], async (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: "Database error: " + err });
//       }

//       if (results.length === 0) {
//           return res.status(401).json({ error: "Invalid email or password" });
//       }

//       const user = results[0];

//       try {
//           // Ensure bcrypt.compare is awaited inside try-catch
//           const passwordMatch = await bcrypt.compare(password, user.password);

//           if (!passwordMatch) {
//               return res.status(401).json({ error: "Invalid email or password" });
//           }

//           // Generate a token (optional)
//           const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

//           res.status(200).json({ message: "Login successful", token, user });
//       } catch (error) {
//           res.status(500).json({ error: "Error comparing passwords" });
//       }
//   });
// });


<<<<<<< HEAD
=======




>>>>>>> e932bf7 (emoloyee to database done)
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


<<<<<<< HEAD

=======
>>>>>>> e932bf7 (emoloyee to database done)
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

<<<<<<< HEAD
const app = express();
=======
const secretKey = "09fadddca878ce21ce1aa20fdccb024dbafedbed5efef820a3c20117bd4b9ef0ef979795b546f881e7fe29986eb3ce5ec6c62f4e22a2c07d855142be3c71e6ca273714ef09cdabc99f0297067343a9d7b71407c7ee886c086ef0bec7f1b58d296568b9bada09ee27311aa94b3650fcfc568b979f3b842468d8397c0b035733e850b62f72102116dcbcfbec5c26b800843a64c9f43523fc4ba8a7f771898ef31efcf1062ff8cda6bcb757a694d6ff31ad5f51604d42c03a87a59afc36ccfc9ae1cb19a52753c9898b9524a316509f35cdaa3d8bc8b2edf6e7cf8d027c882866b6";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
>>>>>>> e932bf7 (emoloyee to database done)
app.use(express.json());
app.use(cors());

// JWT Secret Key
const secretKey = process.env.JWT_SECRET || "your-secure-secret-key";

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "pdsmanagement",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

<<<<<<< HEAD
// Create Employee Table (if not exists)
db.query(`
  CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50),
    fullName VARCHAR(100),
    username VARCHAR(50),
    password VARCHAR(255),
    address TEXT,
    aadharNo VARCHAR(20),
    panNo VARCHAR(20),
    bankName VARCHAR(100),
    accountNumber VARCHAR(50),
    ifscCode VARCHAR(20),
    branchName VARCHAR(100),
    subGodown VARCHAR(100)
  )
`, (err) => {
  if (err) console.error("Error creating employees table:", err);
});

// Create Users Table (for Authentication)
db.query(`
  CREATE TABLE IF NOT EXISTS signup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
  )
`, (err) => {
  if (err) console.error("Error creating users table:", err);
});

// **Signup API**
app.post("/signup", async (req, res) => {
  try {
    const { name, surname, phone_number, email, password } = req.body;

=======
// Signup API
app.post("/signup", async (req, res) => {
  try {
    const { name, surname, phone_number, email, password } = req.body;
>>>>>>> e932bf7 (emoloyee to database done)
    if (!name || !surname || !phone_number || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO signup (name, surname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, surname, phone_number, email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error: " + err });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

<<<<<<< HEAD
// **Login API**
app.post("/signin", async (req, res) => {
=======
// Signin API
app.post("/signin", (req, res) => {
>>>>>>> e932bf7 (emoloyee to database done)
  const { email, password } = req.body;
  const sql = "SELECT * FROM signup WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
<<<<<<< HEAD
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

=======
    if (err) return res.status(500).json({ error: "Database error: " + err });
    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });
    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).json({ error: "Invalid email or password" });
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
>>>>>>> e932bf7 (emoloyee to database done)
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

<<<<<<< HEAD
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

// **Server Listening**
const PORT = process.env.PORT || 5000;
=======

// Fetch all employees
app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees"; // Fetch all employees
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Send employees as JSON
  });
});


// Add Employee API
app.post("/add-employee", (req, res) => {
  const { category, fullName, username, password, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown } = req.body;
  if (!category || !fullName || !username || !password || !address || !aadharNo || !panNo || !bankName || !accountNumber || !ifscCode || !branchName || !subGodown) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const sql = `INSERT INTO employees (category, fullName, username, password, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [category, fullName, username, password, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err });
    }
    res.status(201).json({ message: "Employee added successfully" });
  });
});

>>>>>>> e932bf7 (emoloyee to database done)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
