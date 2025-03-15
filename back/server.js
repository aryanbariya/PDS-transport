const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// JWT Secret Key
const secretKey = process.env.JWT_SECRET || "be5c701d7b261e7cec659a9e361dcded66544da8c1c0930ac57a600d8fbba17f9895fd3f173c1f11608ef295c7ddce94c27338d94e39365ccb35069c18587a1933da8d3c608aa2d2f22a4bee67c55ce14cae2f82a735f4b406a576ec23088cdd0b2682fda5da3f1a4aaddf5f57e804f59773f625c2684dc830b5f42dbc60df496c03994665b46b73fb6a0829e4ac3d7e017fcdaed512288e9ce72eb88726a473bab260d1729e874b988d8c6217e3c8003cf9701b97cc3b2d0299c8fbbace8846e74fcc472536bc04866b2d6ff081c4752e221cf84303cf7da1f4ce0905fced8d";

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST ,///////|| "localhost"
  user: process.env.DB_USER ,//////|| "root"
  password: process.env.DB_PASS ,//////|| ""
  database: process.env.DB_NAME ,/////|| "pdsmanagement"
  port: process.env.DB_PORT , /////|| 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});





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
///////////////////////////////////////////////////////////////////

app.post("/google-signin", async (req, res) => {
  try {
    const { email, name, sub } = req.body; // sub = Google user ID

    if (!email || !name || !sub) {
      return res.status(400).json({ error: "Missing required Google data" });
    }

    // Check if the user already exists in the database
    const sqlCheck = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheck, [email], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        // User exists, generate token
        const user = results[0];
        const token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          "your_secret_key",
          { expiresIn: "1h" }
        );
        return res.json({ message: "Login successful", token, user });
      } else {
        // New user, insert into database
        const sqlInsert =
          "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)";
        db.query(sqlInsert, [name, email, sub], (err, result) => {
          if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ error: "Database insert error" });
          }

          const newUser = {
            id: result.insertId,
            name,
            email,
          };

          const token = jwt.sign(
            { id: newUser.id, email: newUser.email, name: newUser.name },
            "your_secret_key",
            { expiresIn: "1h" }
          );

          return res.status(201).json({
            message: "User registered successfully",
            token,
            user: newUser,
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Google authentication failed" });
  }
});





// **Get All Employees API**
app.get("/api/dropcategory", (req, res) => {
  const query = "SELECT category_name FROM categories WHERE status = 'Active'"; // Fetch only categoryname

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(results);
  });
});
app.get("/api/dropsubgodown", (req, res) => {
  const query = "SELECT subGodown FROM sub_godown WHERE status = 'Active'"; // Fetch only godownname

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(results);
  });
});
app.get("/api/employees", (req, res) => {
  const sql = "SELECT uuid, category, fullName, username, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown, contact, order_number FROM employee ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// **Get Employee by UUID API**
app.get("/api/employees/:uuid", (req, res) => {
  const sql = "SELECT uuid, category, fullName, username, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, subGodown, contact, order_number FROM employee WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) {
      console.error("Error fetching employee:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(results[0]);
  });
});
app.post("/api/employees", async (req, res) => {
  const { category, fullName, username, password, subGodown, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, contact } = req.body;
  
  if (!category || !fullName || !username || !password || !subGodown) {
    return res.status(400).json({ error: "Required fields: category, fullName, username, password, subGodown" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM employee";
    
    db.query(getMaxOrderSql, (err, result) => {
      if (err) {
        console.error("Error getting next order number:", err);
        return res.status(500).json({ error: "Database error" });
      }
      
      const nextOrder = result[0]?.next_order || 1;
      const insertSql = "INSERT INTO employee (uuid, category, fullName, username, password, subGodown, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, contact, order_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(insertSql, [uuid, category, fullName, username, hashedPassword, subGodown, address || null, aadharNo || null, panNo || null, bankName || null, accountNumber || null, ifscCode || null, branchName || null, contact || null, nextOrder], (insertErr) => {
        if (insertErr) {
          console.error("Error inserting employee:", insertErr);
          return res.status(500).json({ error: "Database insertion failed" });
        }
        res.status(201).json({ message: "Employee added successfully", uuid, order_number: nextOrder });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

app.put("/api/employees/:uuid", async (req, res) => {
  const { category, fullName, username, subGodown, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName, password, contact } = req.body;
  
  if (!category || !fullName || !username || !subGodown) {
    return res.status(400).json({ error: "Required fields: category, fullName, username, subGodown" });
  }

  let sql;
  let params;

  if (password) {
    // Hash new password before updating
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    sql = "UPDATE employee SET category = ?, fullName = ?, username = ?, subGodown = ?, address = ?, aadharNo = ?, panNo = ?, bankName = ?, accountNumber = ?, ifscCode = ?, branchName = ?, password = ?, contact = ? WHERE uuid = ?";
    params = [category, fullName, username, subGodown, address || null, aadharNo || null, panNo || null, bankName || null, accountNumber || null, ifscCode || null, branchName || null, hashedPassword, contact|| null, req.params.uuid];
  } else {
    // Don't update password if it's not provided
    sql = "UPDATE employee SET category = ?, fullName = ?, username = ?, subGodown = ?, address = ?, aadharNo = ?, panNo = ?, bankName = ?, accountNumber = ?, ifscCode = ?, branchName = ?, contact = ? WHERE uuid = ?";
    params = [category, fullName, username, subGodown, address || null, aadharNo || null, panNo || null, bankName || null, accountNumber || null, ifscCode || null, branchName || null,contact || null, req.params.uuid];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      return res.status(500).json({ error: "Database update error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  });
});


// app.put("/api/employees/:uuid", (req, res) => {
//   const { category, fullName, username, subGodown, address, aadharNo, panNo, bankName, accountNumber, ifscCode, branchName } = req.body;
  
//   if (!category || !fullName || !username || !subGodown) {
//     return res.status(400).json({ error: "Required fields: category, fullName, username, subGodown" });
//   }

//   const sql = "UPDATE employee SET category = ?, fullName = ?, username = ?, subGodown = ?, address = ?, aadharNo = ?, panNo = ?, bankName = ?, accountNumber = ?, ifscCode = ?, branchName = ? WHERE uuid = ?";

//   db.query(sql, [category, fullName, username, subGodown, address || null, aadharNo || null, panNo || null, bankName || null, accountNumber || null, ifscCode || null, branchName || null, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating employee:", err);
//       return res.status(500).json({ error: "Database update error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     res.json({ message: "Employee updated successfully" });
//   });
// });





// **Delete Employee API**
app.delete("/api/employees/:uuid", (req, res) => {
  const { uuid } = req.params;
  const deleteSql = "DELETE FROM employee WHERE uuid = ?";
  db.query(deleteSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "Database deletion failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    console.log(`✅ Deleted Employee with UUID: ${uuid}`);
    
    const resetSql1 = "SET @new_order = 0";
    const resetSql2 = "UPDATE employee SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting order numbers:", resetErr1);
        return res.status(500).json({ error: "Failed to reset order numbering" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting order numbers:", resetErr2);
          return res.status(500).json({ error: "Failed to reset order numbers" });
        }
        console.log("✅ Order numbers reset successfully!");
        res.json({ message: "Employee deleted and order numbers reset successfully!" });
      });
    });
  });
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start of mswc godown
// Get only "Active" godowns
app.get("/api/mswcgodown/active", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, order_number, status FROM mswc_godowns WHERE status = 'Active' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get only "Inactive" godowns
app.get("/api/mswcgodown/inactive", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, order_number, status FROM mswc_godowns WHERE status = 'Inactive' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/mswcgodown", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, order_number, status FROM mswc_godowns ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get a specific godown by UUID
app.get("/api/mswcgodown/:uuid", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, order_number, status FROM mswc_godowns WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) {
      console.error("Error fetching godown:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json(results[0]);
  });
});

// Add a new godown with auto-incremented order_number and default status "Active"
app.post("/api/mswcgodown", (req, res) => {
  const { godownName, godownUnder } = req.body;
  if (!godownName ) {
    return res.status(400).json({ error: "Godown Name and Godown Under are required" });
  }
  const uuid = uuidv4();
  const status = "Active";

  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM mswc_godowns";
  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next order number:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextOrder = result[0]?.next_order || 1;
    const insertSql = "INSERT INTO mswc_godowns (uuid, godownName, godownUnder, order_number, status) VALUES (?, ?, ?, ?, ?)";

    db.query(insertSql, [uuid, godownName, godownUnder, nextOrder, status], (insertErr) => {
      if (insertErr) {
        console.error("Database Insertion Error:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({ message: "Godown added successfully", uuid, order_number: nextOrder, status });
    });
  });
});

// Update an existing godown
app.put("/api/mswcgodown/:uuid", (req, res) => {
  const { godownName, godownUnder, status } = req.body;

  if (!godownName) {
    return res.status(400).json({ error: "Godown name is required" });
  }

  // If no status is provided, default to "Active"
  const updatedStatus = status || "Active";

  const sql = `
    UPDATE mswc_godowns 
    SET godownName = ?, godownUnder = ?, status = ? 
    WHERE uuid = ?
  `;

  db.query(sql, [godownName, godownUnder, updatedStatus, req.params.uuid], (err, result) => {
    if (err) {
      console.error("Error updating godown:", err);
      return res.status(500).json({ error: "Database update error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json({ message: "Godown updated successfully" });
  });
});

// app.put("/api/mswcgodown/:uuid", (req, res) => {
//   const { godownName, godownUnder, status } = req.body;
//   if (!godownName ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const sql = "UPDATE mswc_godowns SET godownName = ?, godownUnder = ?, status = ? WHERE uuid = ?";
//   db.query(sql, [godownName, godownUnder, status, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating godown:", err);
//       return res.status(500).json({ error: "Database update error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Godown not found" });
//     }
//     res.json({ message: "Godown updated successfully" });
//   });
// });

// Delete a godown and reset order numbers
// Soft Delete a godown (Change status from Active to Inactive)
app.delete("/api/mswcgodown/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE mswc_godowns SET status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating godown status:", err);
      return res.status(500).json({ error: "Failed to update godown status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json({ message: "Godown status updated to Inactive successfully!" });
  });
});

////future delete button
// app.delete("/api/mswcgodown/:uuid", (req, res) => {
//   const { uuid } = req.params;
//   const deleteSql = "DELETE FROM mswc_godowns WHERE uuid = ?";

//   db.query(deleteSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error deleting godown:", err);
//       return res.status(500).json({ error: "Database deletion failed" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Godown not found" });
//     }

//     console.log(`✅ Deleted Godown with UUID: ${uuid}`);

//     // Reset order numbers sequentially
//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE mswc_godowns SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

//     db.query(resetSql1, (resetErr1) => {
//       if (resetErr1) {
//         console.error("Error resetting order numbers:", resetErr1);
//         return res.status(500).json({ error: "Failed to reset order numbering" });
//       }
//       db.query(resetSql2, (resetErr2) => {
//         if (resetErr2) {
//           console.error("Error resetting order numbers:", resetErr2);
//           return res.status(500).json({ error: "Failed to reset order numbers" });
//         }
//         console.log("✅ Order numbers reset successfully!");
//         res.json({ message: "Godown deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });

//end of mswc godown
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







//////////////////////////////////////////////////////////////////////////////
//part of subgodwon
app.get("/api/subgodown/active", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown, order_number, status FROM sub_godown WHERE status = 'Active' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get only "Inactive" godowns
app.get("/api/subgodown/inactive", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown, order_number, status FROM sub_godown WHERE status = 'Inactive' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});
app.get("/api/godowns", (req, res) => {
  const query = "SELECT godownName FROM mswc_godowns WHERE status = 'Active'"; // Fetch only godownname

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(results);
  });
});


app.get("/api/subgodown", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown , status, order_number FROM sub_godown ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/api/subgodown/:uuid", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown , status, order_number FROM sub_godown WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Godown not found" });
    res.json(results[0]);
  });
});

app.post("/api/subgodown", (req, res) => {
  const { parentGodown, subGodown, status = "Active" } = req.body;
  const uuid = uuidv4();

  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM sub_godown";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next order number:", err.sqlMessage || err);
      return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    }

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO sub_godown (uuid, parentGodown, subGodown, status, order_number) VALUES (?, ?, ?, ?, ?)";
    
    db.query(insertSql, [uuid, parentGodown, subGodown, status, nextOrder], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Sub-Godown added successfully", uuid });
    });
  });
});

// Update an existing MSWC Godown
app.put("/api/subgodown/:uuid", (req, res) => {
  const { parentGodown, subGodown, status } = req.body;

  const updatedstatus = status || "Active";
  const sql = "UPDATE sub_godown SET parentGodown = ?, subGodown = ?, status = ? WHERE uuid = ?";
  
  db.query(sql, [parentGodown, subGodown, updatedstatus, req.params.uuid], (err, result) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json({ message: "Godown updated successfully" });
  });
});

// Soft Delete a godown (Change status from Active to Inactive)
app.delete("/api/subgodown/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE sub_godown SET status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating godown status:", err);
      return res.status(500).json({ error: "Failed to update godown status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.json({ message: "Godown status updated to Inactive successfully!" });
  });
});



///delete for future
// app.delete("/api/subgodown/:uuid", (req, res) => {
//   const { uuid } = req.params;

//   // Step 1: Delete the specific record
//   const deleteSql = "DELETE FROM sub_godown WHERE uuid = ?";
//   db.query(deleteSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error deleting:", err.sqlMessage || err);
//       return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Godown not found" });
//     }

//     console.log(`✅ Deleted Godown with UUID: ${uuid}`);

//     // Step 2: Reset order numbers sequentially
//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE sub_godown SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

//     db.query(resetSql1, (resetErr1) => {
//       if (resetErr1) {
//         console.error("Error resetting variable:", resetErr1.sqlMessage || resetErr1);
//         return res.status(500).json({ error: "Failed to reset order numbering variable", details: resetErr1.sqlMessage });
//       }

//       db.query(resetSql2, (resetErr2) => {
//         if (resetErr2) {
//           console.error("Error resetting order numbers:", resetErr2.sqlMessage || resetErr2);
//           return res.status(500).json({ error: "Failed to reset order numbers", details: resetErr2.sqlMessage });
//         }

//         console.log("✅ Order numbers reset successfully!");
//         res.json({ message: "Godown deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });
//////////////////////////////////////////
//start of ownerpage

app.get("/api/owners", (req, res) => {
  const sql = "SELECT uuid, ownerName, contact, address, emailID, order_number FROM owners ORDER BY order_number DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching owners:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});


app.get("/api/owners/:uuid", (req, res) => {
  const sql = "SELECT uuid, ownerName, contact, address, emailID, order_number FROM owners WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) {
      console.error("Error fetching owner:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json(results[0]);
  });
});

app.post("/api/owners", (req, res) => {
  const { ownerName, contact, address, emailID } = req.body;
  
   // Log request body for debugging

  if (!ownerName) {
    return res.status(400).json({ error: "Owner Name is required" });
  }

  const uuid = uuidv4();
  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM owners";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("❌ Error getting next order number:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    const nextOrder = result[0]?.next_order || 1;
    console.log("✅ Next order number:", nextOrder);

    const insertSql = `
      INSERT INTO owners (uuid, ownerName, contact, address, emailID, order_number) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(insertSql, [uuid, ownerName, contact || null, address || null, emailID || null, nextOrder], (insertErr, result) => {
      if (insertErr) {
        console.error("❌ Database Insertion Error:", insertErr);
        return res.status(500).json({ error: "Database insertion failed", details: insertErr.message });
      }
      res.status(201).json({ message: "Owner added successfully", uuid, order_number: nextOrder });
    });
  });
});



// app.put("/api/owners/:uuid", (req, res) => {
//   const { ownerName, contact, address, emailID } = req.body;
//   if (!ownerName || !contact || !address || !emailID) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const sql = "UPDATE owners SET ownerName = ?, contact = ?, address = ?, emailID = ? WHERE uuid = ?";

//   db.query(sql, [ownerName, contact, address, emailID, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating owner:", err);
//       return res.status(500).json({ error: "Database update error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Owner not found" });
//     }
//     res.json({ message: "Owner updated successfully" });
//   });
// });
app.put("/api/owners/:uuid", (req, res) => {
  const { ownerName, contact, address, emailID } = req.body;

  // `ownerName` is required, but other fields can be empty or missing
  if (!ownerName) {
    return res.status(400).json({ error: "Owner name is required" });
  }

  // Prepare fields for update (only update provided values)
  let updateFields = ["ownerName = ?"];
  let values = [ownerName];

  if (contact !== undefined) {
    updateFields.push("contact = ?");
    values.push(contact);
  }
  if (address !== undefined) {
    updateFields.push("address = ?");
    values.push(address);
  }
  if (emailID !== undefined) {
    updateFields.push("emailID = ?");
    values.push(emailID);
  }

  // Construct SQL query dynamically
  const sql = `UPDATE owners SET ${updateFields.join(", ")} WHERE uuid = ?`;
  values.push(req.params.uuid);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating owner:", err);
      return res.status(500).json({ error: "Database update error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json({ message: "Owner updated successfully" });
  });
});





app.delete("/api/owners/:uuid", (req, res) => {
  const { uuid } = req.params;

  // Step 1: Delete the specific record
  const deleteSql = "DELETE FROM owners WHERE uuid = ?";
  db.query(deleteSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error deleting owner:", err);
      return res.status(500).json({ error: "Database deletion failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    console.log(`✅ Deleted Owner with UUID: ${uuid}`);

    // Step 2: Reset order numbers sequentially
    const resetSql1 = "SET @new_order = 0";
    const resetSql2 = "UPDATE owners SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting order numbers:", resetErr1);
        return res.status(500).json({ error: "Failed to reset order numbering" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting order numbers:", resetErr2);
          return res.status(500).json({ error: "Failed to reset order numbers" });
        }

        console.log("✅ Order numbers reset successfully!");
        res.json({ message: "Owner deleted and order numbers reset successfully!" });
      });
    });
  });
});
//endof ownerpage
///////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////
///start of grain page

// Get all grains
app.get("/api/grains", (req, res) => {
  const sql = "SELECT * FROM grains ORDER BY order_number";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching grains:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Get a specific grain by UUID
app.get("/api/grains/:uuid", (req, res) => {
  const { uuid } = req.params;
  const sql = "SELECT * FROM grains WHERE uuid = ?";

  db.query(sql, [uuid], (err, result) => {
    if (err) {
      console.error("Error fetching grain:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Grain not found" });
    }
    res.json(result[0]);
  });
});




app.post("/api/grains", (req, res) => {
  console.log("Incoming Request Body:", req.body); // Debugging log

  const { grainName, godownName } = req.body;

  if (!grainName || !godownName) {
    return res.status(400).json({ error: "Grain name and one Godown selection are required" });
  }

  const uuid = uuidv4();
  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM grains";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next order number:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO grains (uuid, grainName, godownName, order_number) VALUES (?, ?, ?, ?)";

    db.query(insertSql, [uuid, grainName, godownName, nextOrder], (insertErr) => {
      if (insertErr) {
        console.error("Error inserting grain:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({ message: "Grain added successfully", uuid, order_number: nextOrder });
    });
  });
});




app.put("/api/grains/:uuid", (req, res) => {
  const { grainName, mswcGodown, subGodown } = req.body;
  if (!grainName || (!mswcGodown && !subGodown)) {
    return res.status(400).json({ error: "Grain name and one Godown selection are required" });
  }

  const godownName = mswcGodown || subGodown;

  const sql = "UPDATE grains SET grainName = ?, godownName = ? WHERE uuid = ?";

  db.query(sql, [grainName, godownName, req.params.uuid], (err, result) => {
    if (err) {
      console.error("Error updating grain:", err);
      return res.status(500).json({ error: "Database update error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Grain not found" });
    }
    res.json({ message: "Grain updated successfully" });
  });
});

app.delete("/api/grains/:uuid", (req, res) => {
  const { uuid } = req.params;

  const deleteSql = "DELETE FROM grains WHERE uuid = ?";
  db.query(deleteSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error deleting grain:", err);
      return res.status(500).json({ error: "Database deletion failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Grain not found" });
    }

    console.log(`✅ Deleted Grain with UUID: ${uuid}`);

    const resetSql1 = "SET @new_order = 0";
    const resetSql2 = "UPDATE grains SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting order numbers:", resetErr1);
        return res.status(500).json({ error: "Failed to reset order numbering" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting order numbers:", resetErr2);
          return res.status(500).json({ error: "Failed to reset order numbers" });
        }

        console.log("✅ Order numbers reset successfully!");
        res.json({ message: "Grain deleted and order numbers reset successfully!" });
      });
    });
  });
});
///end of grain
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start of driver page

app.get("/api/drivers/active", (req, res) => {
  const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number  FROM drivers WHERE status = 'Active' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active drivers:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get only "Inactive" drivers
app.get("/api/drivers/inactive", (req, res) => {
    const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number  FROM drivers WHERE status = 'Inactive' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive drivers:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/drivers", (req, res) => {
  const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number FROM drivers ORDER BY order_number";
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/api/drivers/:uuid", (req, res) => {
  const sql = "SELECT * FROM drivers WHERE uuid = ?";
  
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Driver not found" });
    
    res.json(results[0]);
  });
});


// Add Driver (POST)
app.post("/api/drivers", (req, res) => {
  const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;
  const uuid = uuidv4();

  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM drivers";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next order number:", err);
      return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    }

    const nextOrder = result[0].next_order;
    const insertSql = `
      INSERT INTO drivers (uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [uuid, driver_name, aadhar_card_no || null, contact || null, driving_license_no || null, status, nextOrder], (insertErr) => {
      if (insertErr) {
        console.error("Error inserting:", insertErr);
        return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
      }

      console.log(`✅ New driver added with order_number: ${nextOrder}, Status: ${status}`);
      res.json({ message: "Driver added successfully", uuid, order_number: nextOrder, status });
    });
  });
});

// Update Driver (PUT)
app.put("/api/drivers/:uuid", (req, res) => {
  const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;

  // Ensure driver_name is provided
  if (!driver_name || driver_name.trim() === "") {
    return res.status(400).json({ error: "Driver name is required" });
  }

  // Prepare dynamic query based on provided fields
  let updates = [];
  let values = [];

  if (driver_name) {
    updates.push("driver_name = ?");
    values.push(driver_name);
  }
  if (aadhar_card_no) {
    updates.push("aadhar_card_no = ?");
    values.push(aadhar_card_no);
  }
  if (contact) {
    updates.push("contact = ?");
    values.push(contact);
  }
  if (driving_license_no) {
    updates.push("driving_license_no = ?");
    values.push(driving_license_no);
  }
  if (status) {
    updates.push("status = ?");
    values.push(status);
  }

  // If no valid fields provided (besides driver_name), return an error
  if (updates.length < 2) {
    return res.status(400).json({ error: "At least one additional field must be updated along with driver_name" });
  }

  // Build the SQL query dynamically
  const sql = `UPDATE drivers SET ${updates.join(", ")} WHERE uuid = ?`;
  values.push(req.params.uuid);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ message: "Driver updated successfully" });
  });
});



// app.post("/api/drivers", (req, res) => {
//   const { driver_name, aadhar_card_no, contact, driving_license_no } = req.body;
//   const uuid = uuidv4(); // Generate UUID

//   const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM drivers";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) {
//       console.error("Error getting next order number:", err);
//       return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//     }

//     const nextOrder = result[0].next_order;
//     const insertSql = "INSERT INTO drivers (uuid, driver_name, aadhar_card_no, contact, driving_license_no, order_number) VALUES (?, ?, ?, ?, ?, ?)";

//     db.query(insertSql, [uuid, driver_name, aadhar_card_no, contact, driving_license_no, nextOrder], (insertErr) => {
//       if (insertErr) {
//         console.error("Error inserting:", insertErr);
//         return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
//       }
      
//       console.log(`✅ New driver added with order_number: ${nextOrder}`);
//       res.json({ message: "Driver added successfully", uuid, order_number: nextOrder });
//     });
//   });
// });

// app.put("/api/drivers/:uuid", (req, res) => {
//   const { driver_name, aadhar_card_no, contact, driving_license_no } = req.body;
//   const sql = "UPDATE drivers SET driver_name = ?, aadhar_card_no = ?, contact = ?, driving_license_no = ? WHERE uuid = ?";
  
//   db.query(sql, [driver_name, aadhar_card_no, contact, driving_license_no, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Driver not found" });
//     }
//     res.json({ message: "Driver updated successfully" });
//   });
// });
// Soft Delete a driver (Change status from Active to Inactive)
app.delete("/api/drivers/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE drivers SET status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating drivers status:", err);
      return res.status(500).json({ error: "Failed to update driver status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "driver not found" });
    }
    res.json({ message: "driver status updated to Inactive successfully!" });
  });
});

// app.delete("/api/drivers/:uuid", (req, res) => {
//   const { uuid } = req.params;

//   // Step 1: Delete the specific record
//   const deleteSql = "DELETE FROM drivers WHERE uuid = ?";
//   db.query(deleteSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error deleting:", err);
//       return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     console.log(`✅ Deleted driver with UUID: ${uuid}`);

//     // Step 2: Reset order numbers sequentially
//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE drivers SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

//     db.query(resetSql1, (resetErr1) => {
//       if (resetErr1) {
//         console.error("Error resetting variable:", resetErr1);
//         return res.status(500).json({ error: "Failed to reset order numbering variable" });
//       }

//       db.query(resetSql2, (resetErr2) => {
//         if (resetErr2) {
//           console.error("Error resetting order numbers:", resetErr2);
//           return res.status(500).json({ error: "Failed to reset order numbers" });
//         }

//         console.log("✅ Order numbers reset successfully!");
//         res.json({ message: "Driver deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });




//////////end of driver page
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// start of truck page


// Get all trucks ordered by order_number
app.get("/api/own", (req, res) => {
  const sql = "SELECT uuid, ownerName, order_number FROM owners ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching owners:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});


app.get("/api/truck/active", (req, res) => {
  const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number  FROM truck WHERE truck_status = 'Active' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active drivers:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get only "Inactive" drivers
app.get("/api/truck/inactive", (req, res) => {
    const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number  FROM truck WHERE truck_status = 'Inactive' ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive drivers:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});



app.get("/api/truck", (req, res) => {
  const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number FROM truck ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a specific truck by UUID
app.get("/api/truck/:uuid", (req, res) => {
  const sql = "SELECT * FROM truck WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Truck not found" });
    res.json(results[0]);
  });
});

// Add a new truck
app.post("/api/truck", (req, res) => {
  const { truck_name, truck_status = "Active", empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;
  if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  const uuid = uuidv4();
  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM truck";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO truck (uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(insertSql, [uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity_date || null, insurance_validity_date || null, fitness_validity_date || null, permit_validity_date || null, direct_sale, nextOrder], (insertErr) => {
      if (insertErr) return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
      res.json({ message: "Truck added successfully", uuid, order_number: nextOrder });
    });
  });
});

// Update an existing truck
app.put("/api/truck/:uuid", (req, res) => {
  const { truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, truck_status = "Active", tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;

  // Ensure required fields are present
  if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
    return res.status(400).json({ error: "Required fields: truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id" });
  }

  // Prepare dynamic update query
  let updates = [];
  let values = [];

  if (truck_name) {
    updates.push("truck_name = ?");
    values.push(truck_name);
  }
  if (empty_weight) {
    updates.push("empty_weight = ?");
    values.push(empty_weight);
  }
  if (company) {
    updates.push("company = ?");
    values.push(company);
  }
  if (gvw) {
    updates.push("gvw = ?");
    values.push(gvw);
  }
  if (reg_date) {
    updates.push("reg_date = ?");
    values.push(reg_date);
  }
  if (truck_owner_name) {
    updates.push("truck_owner_name = ?");
    values.push(truck_owner_name);
  }
  if (owner_id) {
    updates.push("owner_id = ?");
    values.push(owner_id);
  }
  if (truck_status) {
    updates.push("truck_status = ?");
    values.push(truck_status);
  }
  if (tax_validity_date) {
    updates.push("tax_validity = ?");
    values.push(tax_validity_date);
  }
  if (insurance_validity_date) {
    updates.push("insurance_validity = ?");
    values.push(insurance_validity_date);
  }
  if (fitness_validity_date) {
    updates.push("fitness_validity = ?");
    values.push(fitness_validity_date);
  }
  if (permit_validity_date) {
    updates.push("permit_validity = ?");
    values.push(permit_validity_date);
  }
  if (direct_sale !== undefined) {
    updates.push("direct_sale = ?");
    values.push(direct_sale);
  }

  // Ensure at least one additional field is updated along with the required ones
  if (updates.length < 7) {
    return res.status(400).json({ error: "At least one additional field must be updated along with required fields" });
  }

  // Construct SQL query
  const sql = `UPDATE truck SET ${updates.join(", ")} WHERE uuid = ?`;
  values.push(req.params.uuid);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating truck:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.json({ message: "Truck updated successfully" });
  });
});


// Delete a truck and reset order numbers

app.delete("/api/truck/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE truck SET truck_status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating truck status:", err);
      return res.status(500).json({ error: "Failed to update truck status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "truck not found" });
    }
    res.json({ message: "truck status updated to Inactive successfully!" });
  });
});
// app.delete("/api/truck/:uuid", (req, res) => {
//   const deleteSql = "DELETE FROM truck WHERE uuid = ?";
//   db.query(deleteSql, [req.params.uuid], (err, result) => {
//     if (err) return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//     if (result.affectedRows === 0) return res.status(404).json({ message: "Truck not found" });

//     // Reset order numbers
//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE truck SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

//     db.query(resetSql1, (resetErr1) => {
//       if (resetErr1) return res.status(500).json({ error: "Failed to reset order numbering" });
      
//       db.query(resetSql2, (resetErr2) => {
//         if (resetErr2) return res.status(500).json({ error: "Failed to reset order numbers" });
//         res.json({ message: "Truck deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });


///end of truck
///////////////////////////////////////////////////////////////////////////////////////////////////////////////







///////////////////////////////////////////////////////////////////////////////
///** Start of Packaging */



// ✅ Fetch all packaging records (Ordered by order_number)
app.get("/api/packaging", (req, res) => {
  const sql = "SELECT uuid, order_number, material_name, weight, status FROM packaging ORDER BY order_number";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get a specific packaging material by uuid
app.get("/api/packaging/:uuid", (req, res) => {
  const sql = "SELECT uuid, order_number, material_name, weight, status FROM packaging WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Packaging material not found" });
    res.json(results[0]);
  });
});

// ✅ Add a new packaging material
app.post("/api/packaging", (req, res) => {
  const { material_name, weight, status = "Start" } = req.body;
  if (!material_name || !weight) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const uuid = uuidv4();
  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM packaging";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next order number:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO packaging (uuid, material_name, weight, status, order_number) VALUES (?, ?, ?, ?, ?)";

    db.query(insertSql, [uuid, material_name, weight, status, nextOrder], (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting packaging material:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({
        message: "Packaging material added successfully",
        uuid,
        order_number: nextOrder,
      });
    });
  });
});

// ✅ Update an existing packaging material
app.put("/api/packaging/:uuid", (req, res) => {
  const { material_name, weight, status } = req.body;
  if (!material_name || !weight || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE packaging SET material_name = ?, weight = ?, status = ? WHERE uuid = ?";

  db.query(sql, [material_name, weight, status, req.params.uuid], (err, result) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Packaging material not found" });
    }
    res.json({ message: "Packaging material updated successfully" });
  });
});

// ✅ Delete a packaging material and reset order numbers
app.delete("/api/packaging/:uuid", (req, res) => {
  const { uuid } = req.params;

  const deleteSql = "DELETE FROM packaging WHERE uuid = ?";
  db.query(deleteSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error deleting packaging material:", err);
      return res.status(500).json({ error: "Database deletion failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Packaging material not found" });
    }

    console.log(`✅ Deleted Packaging Material with UUID: ${uuid}`);

    // Reset order numbers sequentially
    const resetSql1 = "SET @new_order = 0";
    const resetSql2 = "UPDATE packaging SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting order numbers:", resetErr1);
        return res.status(500).json({ error: "Failed to reset order numbering" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting order numbers:", resetErr2);
          return res.status(500).json({ error: "Failed to reset order numbers" });
        }

        console.log("✅ Order numbers reset successfully!");
        res.json({ message: "Packaging material deleted and order numbers reset successfully!" });
      });
    });
  });
});




//end of packaging
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
//**Start Categories**
// Get all categories
app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a specific category by category_id
app.get("/api/categories/:category_id", (req, res) => {
  const sql = "SELECT * FROM categories WHERE category_id = ?";
  db.query(sql, [req.params.category_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Category not found" });
    res.json(results[0]);
  });
});

// Add a new category
app.post("/api/categories", (req, res) => {
  const { category_name, description } = req.body;

  const insertSql = "INSERT INTO categories (category_name, description) VALUES (?, ?)";
  
  db.query(insertSql, [category_name, description], (insertErr, result) => {
    if (insertErr) {
      console.error("Error inserting:", insertErr.sqlMessage || insertErr);
      return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
    }
    res.json({ message: "Category added successfully", category_id: result.insertId });
  });
});

// Update an existing category
app.put("/api/categories/:category_id", (req, res) => {
  const { category_name, description } = req.body;
  
  const sql = "UPDATE categories SET category_name = ?, description = ? WHERE category_id = ?";
  
  db.query(sql, [category_name, description, req.params.category_id], (err, result) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category updated successfully" });
  });
});

// Delete a category
app.delete("/api/categories/:category_id", (req, res) => {
  const deleteSql = "DELETE FROM categories WHERE category_id = ?";
  db.query(deleteSql, [req.params.category_id], (err, result) => {
    if (err) {
      console.error("Error deleting:", err.sqlMessage || err);
      return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  });
});

//end of categories
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
// **Start Schemes**

// Get all schemes
// app.get("/api/scheme", (req, res) => {
//   const sql = "SELECT uuid, order_number, scheme_name, scheme_status FROM scheme ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });
// Get all schemes
// Get all schemes
app.get("/api/scheme", (req, res) => {
  const sql = "SELECT uuid, order_number, scheme_name, scheme_status FROM scheme ORDER BY scheme_name DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Get a specific scheme by scheme_id
app.get("/api/scheme/:uuid", (req, res) => {
  const sql = "SELECT uuid, order_number, scheme_name, scheme_status FROM scheme WHERE uuid = ?";
  db.query(sql, [req.params.scheme_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Scheme not found" });
    res.json(results[0]);
  });
});


// app.post("/api/scheme", (req, res) => {
//   const uuid = uuidv4(); // Generate a unique UUID
//   const { scheme_name, scheme_status } = req.body;
//   if (!scheme_name || !scheme_status) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

  
//   const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM scheme";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) {
//       console.error("Error getting next order number:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const nextOrder = result[0].next_order;
//     const insertSql = "INSERT INTO scheme (uuid, scheme_name, scheme_status, order_number) VALUES (?, ?, ?, ?)";

//     db.query(insertSql, [uuid, scheme_name, scheme_status, nextOrder], (insertErr, insertResult) => {
//       if (insertErr) {
//         console.error("Error inserting scheme:", insertErr);
//         return res.status(500).json({ error: "Database insertion failed" });
//       }
//       res.status(201).json({ 
//         message: "Scheme added successfully", 
//         uuid, 
//         order_number: nextOrder 
//       });
//     });
//   });
// });
app.post("/api/scheme", (req, res) => {
  const uuid = uuidv4(); // Generate a unique UUID
  const { scheme_name, scheme_status } = req.body;
  if (!scheme_name || !scheme_status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM scheme";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next order number:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO scheme (uuid, scheme_name, scheme_status, order_number) VALUES (?, ?, ?, ?)";

    db.query(insertSql, [uuid, scheme_name, scheme_status, nextOrder], (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting scheme:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({
        message: "Scheme added successfully",
        uuid,
        order_number: nextOrder
      });
    });
  });
});


app.put("/api/scheme/:uuid", (req, res) => {
  const { scheme_name, scheme_status } = req.body;
  if (!scheme_name || !scheme_status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE scheme SET scheme_name = ?, scheme_status = ? WHERE uuid = ?";

  db.query(sql, [scheme_name, scheme_status, req.params.uuid], (err, result) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json({ message: "Scheme updated successfully" });
  });
});




app.delete("/api/scheme/:uuid", (req, res) => {
  const { uuid } = req.params;

  // Step 1: Delete the specific scheme
  const deleteSql = "DELETE FROM scheme WHERE uuid = ?";
  db.query(deleteSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error deleting scheme:", err);
      return res.status(500).json({ error: "Database deletion failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Scheme not found" });
    }

    console.log(`✅ Deleted Scheme with UUID: ${uuid}`);

    // Step 2: Reset order numbers sequentially
    const resetSql1 = "SET @new_order = 0";
    const resetSql2 = "UPDATE scheme SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting order numbers:", resetErr1);
        return res.status(500).json({ error: "Failed to reset order numbering" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting order numbers:", resetErr2);
          return res.status(500).json({ error: "Failed to reset order numbers" });
        }

        console.log("✅ Order numbers reset successfully!");
        res.json({ message: "Scheme deleted and order numbers reset successfully!" });
      });
    });
  });
});



// **End of Schemes**
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // **Start Transport Detail API**

// // Get all transport details
// app.get("/api/transport", (req, res) => {
//   const sql = `
//     SELECT td.*, 
//     g.godown_name, 
//     o.owner_name, 
//     t.truck_no, 
//     p.pack_name,
//     s.scheme_name
//     FROM transport_detail td
//     LEFT JOIN godown g ON td.godown_id = g.godown_id
//     LEFT JOIN owner o ON td.owner_id = o.owner_id
//     LEFT JOIN truck t ON td.truck_id = t.truck_id
//     LEFT JOIN packaging p ON td.pack_id = p.pack_id
//     LEFT JOIN scheme s ON td.scheme_id = s.scheme_id
//     ORDER BY td.tp_date DESC, td.tp_no DESC`;
    
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Get a specific transport detail
// app.get("/api/transport/:id", (req, res) => {
//   const sql = `
//     SELECT td.*, 
//     g.godown_name, 
//     o.owner_name, 
//     t.truck_no, 
//     p.pack_name,
//     s.scheme_name
//     FROM transport_detail td
//     LEFT JOIN godown g ON td.godown_id = g.godown_id
//     LEFT JOIN owner o ON td.owner_id = o.owner_id
//     LEFT JOIN truck t ON td.truck_id = t.truck_id
//     LEFT JOIN packaging p ON td.pack_id = p.pack_id
//     LEFT JOIN scheme s ON td.scheme_id = s.scheme_id
//     WHERE td.trans_id = ?`;
    
//   db.query(sql, [req.params.id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Transport detail not found" });
//     res.json(results[0]);
//   });
// });

// // Create a new transport detail
// app.post("/api/transport", (req, res) => {
//   const {
//     stock_id,
//     godown_id,
//     owner_id,
//     truck_id,
//     driver_id,
//     item_id,
//     scheme_id,
//     sup_id,
//     empty_weight,
//     gross_weight,
//     bags_weight,
//     description,
//     latitude,
//     longtitude,
//     address,
//     truck_img,
//     trans_status,
//     tp_no,
//     do_no,
//     subgd_id,
//     tp_date,
//     in_time,
//     out_time,
//     loaded_net_weight,
//     net_weight,
//     tp_type,
//     bardan_weight,
//     cota,
//     pack_id,
//     group_under,
//     dispatch_of
//   } = req.body;

//   // Validate required fields
//   if (!godown_id || !owner_id || !truck_id || !tp_no || !tp_date) {
//     return res.status(400).json({ error: "Required fields are missing" });
//   }
  
//   // Set load_date_time to current date and time if not provided
//   const load_date_time = req.body.load_date_time || new Date();

//   const sql = `INSERT INTO transport_detail (
//     stock_id, godown_id, owner_id, truck_id, driver_id, 
//     item_id, scheme_id, sup_id, empty_weight, gross_weight, 
//     bags_weight, description, latitude, longtitude, address, 
//     truck_img, load_date_time, trans_status, tp_no, do_no, 
//     subgd_id, tp_date, in_time, out_time, loaded_net_weight, 
//     net_weight, tp_type, bardan_weight, cota, pack_id, 
//     group_under, dispatch_of
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(sql, [
//     stock_id || 0, 
//     godown_id, 
//     owner_id, 
//     truck_id, 
//     driver_id || '', 
//     item_id || 0, 
//     scheme_id || 0, 
//     sup_id || 0, 
//     empty_weight || 0, 
//     gross_weight || 0, 
//     bags_weight || 0, 
//     description || '', 
//     latitude || '', 
//     longtitude || '', 
//     address || '', 
//     truck_img || '', 
//     load_date_time, 
//     trans_status || 'pending', 
//     tp_no, 
//     do_no || '', 
//     subgd_id || 0, 
//     tp_date, 
//     in_time || '', 
//     out_time || '', 
//     loaded_net_weight || 0, 
//     net_weight || 0, 
//     tp_type || '', 
//     bardan_weight || 0, 
//     cota || null, 
//     pack_id || 0, 
//     group_under || '', 
//     dispatch_of || ''
//   ], (err, result) => {
//     if (err) {
//       console.error("Error creating transport detail:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
    
//     res.status(201).json({
//       message: "Transport detail created successfully",
//       id: result.insertId
//     });
//   });
// });

// // Update a transport detail
// app.put("/api/transport/:id", (req, res) => {
//   const {
//     stock_id,
//     godown_id,
//     owner_id,
//     truck_id,
//     driver_id,
//     item_id,
//     scheme_id,
//     sup_id,
//     empty_weight,
//     gross_weight,
//     bags_weight,
//     description,
//     latitude,
//     longtitude,
//     address,
//     truck_img,
//     trans_status,
//     tp_no,
//     do_no,
//     subgd_id,
//     tp_date,
//     in_time,
//     out_time,
//     loaded_net_weight,
//     net_weight,
//     tp_type,
//     bardan_weight,
//     cota,
//     pack_id,
//     group_under,
//     dispatch_of
//   } = req.body;

//   // Validate required fields
//   if (!godown_id || !owner_id || !truck_id || !tp_no || !tp_date) {
//     return res.status(400).json({ error: "Required fields are missing" });
//   }

//   const sql = `UPDATE transport_detail SET
//     stock_id = ?,
//     godown_id = ?,
//     owner_id = ?,
//     truck_id = ?,
//     driver_id = ?,
//     item_id = ?,
//     scheme_id = ?,
//     sup_id = ?,
//     empty_weight = ?,
//     gross_weight = ?,
//     bags_weight = ?,
//     description = ?,
//     latitude = ?,
//     longtitude = ?,
//     address = ?,
//     truck_img = ?,
//     trans_status = ?,
//     tp_no = ?,
//     do_no = ?,
//     subgd_id = ?,
//     tp_date = ?,
//     in_time = ?,
//     out_time = ?,
//     loaded_net_weight = ?,
//     net_weight = ?,
//     tp_type = ?,
//     bardan_weight = ?,
//     cota = ?,
//     pack_id = ?,
//     group_under = ?,
//     dispatch_of = ?
//     WHERE trans_id = ?`;

//   db.query(sql, [
//     stock_id || 0,
//     godown_id,
//     owner_id,
//     truck_id,
//     driver_id || '',
//     item_id || 0,
//     scheme_id || 0,
//     sup_id || 0,
//     empty_weight || 0,
//     gross_weight || 0,
//     bags_weight || 0,
//     description || '',
//     latitude || '',
//     longtitude || '',
//     address || '',
//     truck_img || '',
//     trans_status || 'pending',
//     tp_no,
//     do_no || '',
//     subgd_id || 0,
//     tp_date,
//     in_time || '',
//     out_time || '',
//     loaded_net_weight || 0,
//     net_weight || 0,
//     tp_type || '',
//     bardan_weight || 0,
//     cota || null,
//     pack_id || 0,
//     group_under || '',
//     dispatch_of || '',
//     req.params.id
//   ], (err, result) => {
//     if (err) {
//       console.error("Error updating transport detail:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
    
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Transport detail not found" });
//     }
    
//     res.json({ message: "Transport detail updated successfully" });
//   });
// });

// // Delete a transport detail
// app.delete("/api/transport/:id", (req, res) => {
//   const sql = "DELETE FROM transport_detail WHERE trans_id = ?";
  
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       console.error("Error deleting transport detail:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
    
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Transport detail not found" });
//     }
    
//     res.json({ message: "Transport detail deleted successfully" });
//   });
// });

// // Get transport details by date
// app.get("/api/transport/date/:date", (req, res) => {
//   const sql = `
//     SELECT td.*, 
//     g.godown_name, 
//     o.owner_name, 
//     t.truck_no, 
//     p.pack_name,
//     s.scheme_name
//     FROM transport_detail td
//     LEFT JOIN godown g ON td.godown_id = g.godown_id
//     LEFT JOIN owner o ON td.owner_id = o.owner_id
//     LEFT JOIN truck t ON td.truck_id = t.truck_id
//     LEFT JOIN packaging p ON td.pack_id = p.pack_id
//     LEFT JOIN scheme s ON td.scheme_id = s.scheme_id
//     WHERE DATE(td.tp_date) = ?
//     ORDER BY td.tp_no DESC`;
    
//   db.query(sql, [req.params.date], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Additional API endpoints for dropdown data

// // Get all owners for dropdown
// app.get("/api/dropowners", (req, res) => {
//   const sql = "SELECT owner_id, owner_name FROM owner ORDER BY owner_name";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Get all godowns for dropdown
// app.get("/api/dropgodowns", (req, res) => {
//   const sql = "SELECT godown_id, godown_name FROM godown ORDER BY godown_name";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Get all packaging types for dropdown
// app.get("/api/droppackaging", (req, res) => {
//   const sql = "SELECT pack_id, pack_name FROM packaging ORDER BY pack_name";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Get all trucks for dropdown/search
// app.get("/api/droptrucks", (req, res) => {
//   const sql = "SELECT truck_id, truck_no FROM truck ORDER BY truck_no";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Search trucks by truck number
// app.get("/api/searchtrucks", (req, res) => {
//   const query = req.query.q || '';
//   const sql = "SELECT truck_id, truck_no FROM truck WHERE truck_no LIKE ? ORDER BY truck_no LIMIT 10";
  
//   db.query(sql, [`%${query}%`], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // **End Transport Detail API**


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///tapa
app.get("/api/tapa", (req, res) => {
  const sql = "SELECT trans_id, stock_id, godown_id, owner_id, truck_id, driver_id, item_id, scheme_id, sup_id, empty_weight, gross_weight, bags_weight, description, latitude, longtitude, address, truck_img, load_date_time, trans_status, tp_no, do_no, subgd_id, tp_date, in_time, out_time, loaded_net_weight, net_weight, tp_type, bardan_weight, cota, pack_id, group_under, dispatch_of FROM transport_detail ORDER BY trans_id ";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Get a specific scheme by scheme_id
app.get("/api/tapa/:uuid", (req, res) => {
  const sql = "SELECT * FROM transport_detail WHERE uuid = ?";
  db.query(sql, [req.params.scheme_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "tp not found" });
    res.json(results[0]);
  });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  COUNT OF CARDS

app.get("/api/getRowCounts", (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM owners) AS table1_count,
      (SELECT COUNT(*) FROM employee) AS table2_count,
      (SELECT COUNT(*) FROM mswc_godowns) AS table3_count,
      (SELECT COUNT(*) FROM sub_godown) AS table4_count,
      (SELECT COUNT(*) FROM truck) AS table6_count,
      (SELECT COUNT(*) FROM scheme) AS table7_count,
      (SELECT COUNT(*) FROM packaging) AS table8_count,
      (SELECT COUNT(*) FROM drivers) AS table9_count,
      
      (SELECT MAX(last_modified) FROM owners) AS last_modified_owners,
      (SELECT MAX(last_modified) FROM employee) AS last_modified_employee,
      (SELECT MAX(last_modified) FROM mswc_godowns) AS last_modified_mswc,
      (SELECT MAX(last_modified) FROM sub_godown) AS last_modified_sub_godown,
      (SELECT MAX(last_modified) FROM truck) AS last_modified_truck,
      (SELECT MAX(last_modified) FROM scheme) AS last_modified_scheme,
      (SELECT MAX(last_modified) FROM packaging) AS last_modified_packaging,
      (SELECT MAX(last_modified) FROM drivers) AS last_modified_drivers
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const counts = results[0]; // Extract results

    // Function to format timestamps into a readable format
    const formatDateTime = (timestamp) => {
      return timestamp
        ? new Date(timestamp).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata", // Convert to IST (India Standard Time)
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        : "N/A"; // If NULL, return "N/A"
    };

    res.json({
      ownercount: counts.table1_count,
      employeecount: counts.table2_count,
      mswccount: counts.table3_count,
      godowncount: counts.table4_count,
      truckcount: counts.table6_count,
      schemecount: counts.table7_count,
      packagingcount: counts.table8_count,
      drivercount: counts.table9_count,

      lastModifiedOwners: formatDateTime(counts.last_modified_owners),
      lastModifiedEmployee: formatDateTime(counts.last_modified_employee),
      lastModifiedMSWC: formatDateTime(counts.last_modified_mswc),
      lastModifiedSubGodown: formatDateTime(counts.last_modified_sub_godown),
      lastModifiedTruck: formatDateTime(counts.last_modified_truck),
      lastModifiedScheme: formatDateTime(counts.last_modified_scheme),
      lastModifiedPackaging: formatDateTime(counts.last_modified_packaging),
      lastModifieddriver: formatDateTime(counts.last_modified_drivers),
    });
  });
});





///////////////////////////////////////////////////////////////////////////////////////////

// **Server Listening**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});