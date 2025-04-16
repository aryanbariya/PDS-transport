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
  const query = "SELECT subGodown FROM sub_godown WHERE status = 'Active' ORDER BY subgodown_id ASC;"; // Fetch only godownname

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
app.get("/api/mswcgodown/active", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns WHERE status = 'Active' ORDER BY mswc_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/mswcgodown/inactive", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns WHERE status = 'Inactive' ORDER BY mswc_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/mswcgodown", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns ORDER BY mswc_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/mswcgodown/:uuid", (req, res) => {
  const sql = "SELECT uuid, godownName, godownUnder, mswc_id, status FROM mswc_godowns WHERE uuid = ?";
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

app.post("/api/mswcgodown", (req, res) => {
  const { godownName, godownUnder } = req.body;
  if (!godownName) {
    return res.status(400).json({ error: "Godown Name and Godown Under are required" });
  }
  const uuid = uuidv4();
  const status = "Active";

  const getMaxSql = "SELECT COALESCE(MAX(mswc_id), 0) + 1 AS next_id FROM mswc_godowns";
  db.query(getMaxSql, (err, result) => {
    if (err) {
      console.error("Error getting next MSWC ID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextId = result[0]?.next_id || 1;
    const insertSql = "INSERT INTO mswc_godowns (uuid, godownName, godownUnder, mswc_id, status) VALUES (?, ?, ?, ?, ?)";

    db.query(insertSql, [uuid, godownName, godownUnder, nextId, status], (insertErr) => {
      if (insertErr) {
        console.error("Database Insertion Error:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({ message: "Godown added successfully", uuid, mswc_id: nextId, status });
    });
  });
});

app.put("/api/mswcgodown/:uuid", (req, res) => {
  const { godownName, godownUnder, status } = req.body;

  if (!godownName) {
    return res.status(400).json({ error: "Godown name is required" });
  }

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


//end of mswc godown
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







//////////////////////////////////////////////////////////////////////////////
//start of sub godown
app.get("/api/subgodown/active", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown WHERE status = 'Active' ORDER BY subgodown_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/subgodown/inactive", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown, subgodown_id, status FROM sub_godown WHERE status = 'Inactive' ORDER BY subgodown_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive godowns:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/godowns", (req, res) => {
  const query = "SELECT godownName FROM mswc_godowns WHERE status = 'Active'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

app.get("/api/subgodown", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown , status, subgodown_id FROM sub_godown ORDER BY subgodown_id";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/api/subgodown/:uuid", (req, res) => {
  const sql = "SELECT uuid, parentGodown, subGodown , status, subgodown_id FROM sub_godown WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Godown not found" });
    res.json(results[0]);
  });
});

app.post("/api/subgodown", (req, res) => {
  const { parentGodown, subGodown, status = "Active" } = req.body;
  const uuid = uuidv4();

  const getMaxOrderSql = "SELECT COALESCE(MAX(subgodown_id), 0) + 1 AS next_order FROM sub_godown";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next subgodown_id:", err.sqlMessage || err);
      return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    }

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO sub_godown (uuid, parentGodown, subGodown, status, subgodown_id) VALUES (?, ?, ?, ?, ?)";
    
    db.query(insertSql, [uuid, parentGodown, subGodown, status, nextOrder], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Sub-Godown added successfully", uuid });
    });
  });
});

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
// GET all owners (sorted by owner_id)
app.get("/api/owners", (req, res) => {
  const sql = "SELECT uuid, ownerName, contact, address, emailID, owner_id FROM owners ORDER BY owner_id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching owners:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// GET single owner
app.get("/api/owners/:uuid", (req, res) => {
  const sql = "SELECT uuid, ownerName, contact, address, emailID, owner_id FROM owners WHERE uuid = ?";
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

// POST new owner
app.post("/api/owners", (req, res) => {
  const { ownerName, contact, address, emailID } = req.body;

  if (!ownerName) {
    return res.status(400).json({ error: "Owner Name is required" });
  }

  const uuid = uuidv4();
  const getMaxOrderSql = "SELECT COALESCE(MAX(owner_id), 0) + 1 AS next_owner_id FROM owners";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("❌ Error getting next owner_id:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    const nextOwnerId = result[0]?.next_owner_id || 1;
    console.log("✅ Next owner_id:", nextOwnerId);

    const insertSql = `
      INSERT INTO owners (uuid, ownerName, contact, address, emailID, owner_id) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(insertSql, [uuid, ownerName, contact || null, address || null, emailID || null, nextOwnerId], (insertErr, result) => {
      if (insertErr) {
        console.error("❌ Database Insertion Error:", insertErr);
        return res.status(500).json({ error: "Database insertion failed", details: insertErr.message });
      }
      res.status(201).json({ message: "Owner added successfully", uuid, owner_id: nextOwnerId });
    });
  });
});

// PUT update owner
app.put("/api/owners/:uuid", (req, res) => {
  const { ownerName, contact, address, emailID } = req.body;

  if (!ownerName) {
    return res.status(400).json({ error: "Owner name is required" });
  }

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

// DELETE owner and reset owner_id
app.delete("/api/owners/:uuid", (req, res) => {
  const { uuid } = req.params;

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

    // Reset owner_id (sequentially)
    const resetSql1 = "SET @new_id = 0";
    const resetSql2 = "UPDATE owners SET owner_id = (@new_id := @new_id + 1) ORDER BY owner_id";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting owner_id:", resetErr1);
        return res.status(500).json({ error: "Failed to reset owner_id" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting owner_id:", resetErr2);
          return res.status(500).json({ error: "Failed to reset owner_id" });
        }

        console.log("✅ Owner IDs reset successfully!");
        res.json({ message: "Owner deleted and owner_id reset successfully!" });
      });
    });
  });
});

//endof ownerpage
///////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////
///start of grain page

// // Get all grains

app.get("/api/grains", (req, res) => {
  const sql = "SELECT * FROM grains ORDER BY grain_id";

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
  const getMaxOrderSql = "SELECT COALESCE(MAX(grain_id), 0) + 1 AS next_id FROM grains";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next grain ID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextGrainId = result[0].next_id;
    const insertSql = "INSERT INTO grains (uuid, grainName, godownName, grain_id) VALUES (?, ?, ?, ?)";

    db.query(insertSql, [uuid, grainName, godownName, nextGrainId], (insertErr) => {
      if (insertErr) {
        console.error("Error inserting grain:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({ message: "Grain added successfully", uuid, grain_id: nextGrainId });
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

    const resetSql1 = "SET @new_id = 0";
    const resetSql2 = "UPDATE grains SET grain_id = (@new_id := @new_id + 1) ORDER BY grain_id";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting grain IDs:", resetErr1);
        return res.status(500).json({ error: "Failed to reset grain IDs" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting grain IDs:", resetErr2);
          return res.status(500).json({ error: "Failed to reset grain IDs" });
        }

        console.log("✅ Grain IDs reset successfully!");
        res.json({ message: "Grain deleted and grain IDs reset successfully!" });
      });
    });
  });
});


// app.get("/api/grains", (req, res) => {
//   const sql = "SELECT * FROM grains ORDER BY order_number";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching grains:", err);
//       return res.status(500).json({ error: "Database query failed" });
//     }
//     res.json(results);
//   });
// });

// // Get a specific grain by UUID
// app.get("/api/grains/:uuid", (req, res) => {
//   const { uuid } = req.params;
//   const sql = "SELECT * FROM grains WHERE uuid = ?";

//   db.query(sql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error fetching grain:", err);
//       return res.status(500).json({ error: "Database query failed" });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Grain not found" });
//     }
//     res.json(result[0]);
//   });
// });

// app.post("/api/grains", (req, res) => {
//   console.log("Incoming Request Body:", req.body); // Debugging log

//   const { grainName, godownName } = req.body;

//   if (!grainName || !godownName) {
//     return res.status(400).json({ error: "Grain name and one Godown selection are required" });
//   }

//   const uuid = uuidv4();
//   const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM grains";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) {
//       console.error("Error getting next order number:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const nextOrder = result[0].next_order;
//     const insertSql = "INSERT INTO grains (uuid, grainName, godownName, order_number) VALUES (?, ?, ?, ?)";

//     db.query(insertSql, [uuid, grainName, godownName, nextOrder], (insertErr) => {
//       if (insertErr) {
//         console.error("Error inserting grain:", insertErr);
//         return res.status(500).json({ error: "Database insertion failed" });
//       }
//       res.status(201).json({ message: "Grain added successfully", uuid, order_number: nextOrder });
//     });
//   });
// });

// app.put("/api/grains/:uuid", (req, res) => {
//   const { grainName, mswcGodown, subGodown } = req.body;
//   if (!grainName || (!mswcGodown && !subGodown)) {
//     return res.status(400).json({ error: "Grain name and one Godown selection are required" });
//   }

//   const godownName = mswcGodown || subGodown;

//   const sql = "UPDATE grains SET grainName = ?, godownName = ? WHERE uuid = ?";

//   db.query(sql, [grainName, godownName, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating grain:", err);
//       return res.status(500).json({ error: "Database update error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Grain not found" });
//     }
//     res.json({ message: "Grain updated successfully" });
//   });
// });

// app.delete("/api/grains/:uuid", (req, res) => {
//   const { uuid } = req.params;

//   const deleteSql = "DELETE FROM grains WHERE uuid = ?";
//   db.query(deleteSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error deleting grain:", err);
//       return res.status(500).json({ error: "Database deletion failed" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Grain not found" });
//     }

//     console.log(`✅ Deleted Grain with UUID: ${uuid}`);

//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE grains SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

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
//         res.json({ message: "Grain deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });
///end of grain
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start of driver page

// app.get("/api/drivers/active", (req, res) => {
//   const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number  FROM drivers WHERE status = 'Active' ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching active drivers:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });

// // Get only "Inactive" drivers
// app.get("/api/drivers/inactive", (req, res) => {
//     const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number  FROM drivers WHERE status = 'Inactive' ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching inactive drivers:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });

// app.get("/api/drivers", (req, res) => {
//   const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number FROM drivers ORDER BY order_number";
  
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// app.get("/api/drivers/:uuid", (req, res) => {
//   const sql = "SELECT * FROM drivers WHERE uuid = ?";
  
//   db.query(sql, [req.params.uuid], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Driver not found" });
    
//     res.json(results[0]);
//   });
// });


// // Add Driver (POST)
// app.post("/api/drivers", (req, res) => {
//   const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;
//   const uuid = uuidv4();

//   const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM drivers";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) {
//       console.error("Error getting next order number:", err);
//       return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//     }

//     const nextOrder = result[0].next_order;
//     const insertSql = `
//       INSERT INTO drivers (uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, order_number) 
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(insertSql, [uuid, driver_name, aadhar_card_no || null, contact || null, driving_license_no || null, status, nextOrder], (insertErr) => {
//       if (insertErr) {
//         console.error("Error inserting:", insertErr);
//         return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
//       }

//       console.log(`✅ New driver added with order_number: ${nextOrder}, Status: ${status}`);
//       res.json({ message: "Driver added successfully", uuid, order_number: nextOrder, status });
//     });
//   });
// });

// // Update Driver (PUT)
// app.put("/api/drivers/:uuid", (req, res) => {
//   const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;

//   // Ensure driver_name is provided
//   if (!driver_name || driver_name.trim() === "") {
//     return res.status(400).json({ error: "Driver name is required" });
//   }

//   // Prepare dynamic query based on provided fields
//   let updates = [];
//   let values = [];

//   if (driver_name) {
//     updates.push("driver_name = ?");
//     values.push(driver_name);
//   }
//   if (aadhar_card_no) {
//     updates.push("aadhar_card_no = ?");
//     values.push(aadhar_card_no);
//   }
//   if (contact) {
//     updates.push("contact = ?");
//     values.push(contact);
//   }
//   if (driving_license_no) {
//     updates.push("driving_license_no = ?");
//     values.push(driving_license_no);
//   }
//   if (status) {
//     updates.push("status = ?");
//     values.push(status);
//   }

//   // If no valid fields provided (besides driver_name), return an error
//   if (updates.length < 2) {
//     return res.status(400).json({ error: "At least one additional field must be updated along with driver_name" });
//   }

//   // Build the SQL query dynamically
//   const sql = `UPDATE drivers SET ${updates.join(", ")} WHERE uuid = ?`;
//   values.push(req.params.uuid);

//   db.query(sql, values, (err, result) => {
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



// // Soft Delete a driver (Change status from Active to Inactive)
// app.delete("/api/drivers/:uuid", (req, res) => {
//   const { uuid } = req.params;
//   const updateSql = "UPDATE drivers SET status = 'Inactive' WHERE uuid = ?";

//   db.query(updateSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating drivers status:", err);
//       return res.status(500).json({ error: "Failed to update driver status" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "driver not found" });
//     }
//     res.json({ message: "driver status updated to Inactive successfully!" });
//   });
// });

// Get only "Active" drivers
app.get("/api/drivers/active", (req, res) => {
  const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id FROM drivers WHERE status = 'Active' ORDER BY driver_id";
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
  const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id FROM drivers WHERE status = 'Inactive' ORDER BY driver_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive drivers:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get all drivers
app.get("/api/drivers", (req, res) => {
  const sql = "SELECT uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id FROM drivers ORDER BY driver_id";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single driver by UUID
app.get("/api/drivers/:uuid", (req, res) => {
  const sql = "SELECT * FROM drivers WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Driver not found" });
    res.json(results[0]);
  });
});

// Add Driver
app.post("/api/drivers", (req, res) => {
  const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;
  const uuid = uuidv4();

  const getMaxOrderSql = "SELECT COALESCE(MAX(driver_id), 0) + 1 AS next_order FROM drivers";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) {
      console.error("Error getting next driver ID:", err);
      return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    }

    const nextOrder = result[0].next_order;
    const insertSql = `
      INSERT INTO drivers (uuid, driver_name, aadhar_card_no, contact, driving_license_no, status, driver_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [uuid, driver_name, aadhar_card_no || null, contact || null, driving_license_no || null, status, nextOrder], (insertErr) => {
      if (insertErr) {
        console.error("Error inserting:", insertErr);
        return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
      }

      console.log(`✅ New driver added with driver_id: ${nextOrder}, Status: ${status}`);
      res.json({ message: "Driver added successfully", uuid, driver_id: nextOrder, status });
    });
  });
});

// Update Driver
app.put("/api/drivers/:uuid", (req, res) => {
  const { driver_name, aadhar_card_no, contact, driving_license_no, status = "Active" } = req.body;

  if (!driver_name || driver_name.trim() === "") {
    return res.status(400).json({ error: "Driver name is required" });
  }

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

  if (updates.length < 2) {
    return res.status(400).json({ error: "At least one additional field must be updated along with driver_name" });
  }

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

// Soft Delete Driver (set status to Inactive)
app.delete("/api/drivers/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE drivers SET status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating drivers status:", err);
      return res.status(500).json({ error: "Failed to update driver status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ message: "Driver status updated to Inactive successfully!" });
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
// app.get("/api/own", (req, res) => {
//   const sql = "SELECT uuid, ownerName, order_number FROM owners ORDER BY owner_id";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching owners:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });


// app.get("/api/truck/active", (req, res) => {
//   const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number  FROM truck WHERE truck_status = 'Active' ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching active drivers:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });

// // Get only "Inactive" drivers
// app.get("/api/truck/inactive", (req, res) => {
//     const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number  FROM truck WHERE truck_status = 'Inactive' ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching inactive drivers:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });



// app.get("/api/truck", (req, res) => {
//   const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number FROM truck ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Get a specific truck by UUID
// app.get("/api/truck/:uuid", (req, res) => {
//   const sql = "SELECT * FROM truck WHERE uuid = ?";
//   db.query(sql, [req.params.uuid], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Truck not found" });
//     res.json(results[0]);
//   });
// });

// // Add a new truck
// app.post("/api/truck", (req, res) => {
//   const { truck_name, truck_status = "Active", empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;
//   if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
//     return res.status(400).json({ error: "All required fields must be filled" });
//   }

//   const uuid = uuidv4();
//   const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM truck";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) return res.status(500).json({ error: "Database error" });

//     const nextOrder = result[0].next_order;
//     const insertSql = "INSERT INTO truck (uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, order_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     db.query(insertSql, [uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity_date || null, insurance_validity_date || null, fitness_validity_date || null, permit_validity_date || null, direct_sale, nextOrder], (insertErr) => {
//       if (insertErr) return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
//       res.json({ message: "Truck added successfully", uuid, order_number: nextOrder });
//     });
//   });
// });

// Update an existing truck
// app.put("/api/truck/:uuid", (req, res) => {
//   const { truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, truck_status = "Active", tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;

//   // Ensure required fields are present
//   if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
//     return res.status(400).json({ error: "Required fields: truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id" });
//   }

//   // Prepare dynamic update query
//   let updates = [];
//   let values = [];

//   if (truck_name) {
//     updates.push("truck_name = ?");
//     values.push(truck_name);
//   }
//   if (empty_weight) {
//     updates.push("empty_weight = ?");
//     values.push(empty_weight);
//   }
//   if (company) {
//     updates.push("company = ?");
//     values.push(company);
//   }
//   if (gvw) {
//     updates.push("gvw = ?");
//     values.push(gvw);
//   }
//   if (reg_date) {
//     updates.push("reg_date = ?");
//     values.push(reg_date);
//   }
//   if (truck_owner_name) {
//     updates.push("truck_owner_name = ?");
//     values.push(truck_owner_name);
//   }
//   if (owner_id) {
//     updates.push("owner_id = ?");
//     values.push(owner_id);
//   }
//   if (truck_status) {
//     updates.push("truck_status = ?");
//     values.push(truck_status);
//   }
//   if (tax_validity_date) {
//     updates.push("tax_validity = ?");
//     values.push(tax_validity_date);
//   }
//   if (insurance_validity_date) {
//     updates.push("insurance_validity = ?");
//     values.push(insurance_validity_date);
//   }
//   if (fitness_validity_date) {
//     updates.push("fitness_validity = ?");
//     values.push(fitness_validity_date);
//   }
//   if (permit_validity_date) {
//     updates.push("permit_validity = ?");
//     values.push(permit_validity_date);
//   }
//   if (direct_sale !== undefined) {
//     updates.push("direct_sale = ?");
//     values.push(direct_sale);
//   }

//   // Ensure at least one additional field is updated along with the required ones
//   if (updates.length < 7) {
//     return res.status(400).json({ error: "At least one additional field must be updated along with required fields" });
//   }

//   // Construct SQL query
//   const sql = `UPDATE truck SET ${updates.join(", ")} WHERE uuid = ?`;
//   values.push(req.params.uuid);

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error updating truck:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Truck not found" });
//     }
//     res.json({ message: "Truck updated successfully" });
//   });
// });


// // Delete a truck and reset order numbers

// app.delete("/api/truck/:uuid", (req, res) => {
//   const { uuid } = req.params;
//   const updateSql = "UPDATE truck SET truck_status = 'Inactive' WHERE uuid = ?";

//   db.query(updateSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating truck status:", err);
//       return res.status(500).json({ error: "Failed to update truck status" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "truck not found" });
//     }
//     res.json({ message: "truck status updated to Inactive successfully!" });
//   });
// });

// Get all trucks ordered by truck_id
app.get("/api/own", (req, res) => {
  const sql = "SELECT uuid, ownerName, truck_id FROM owners ORDER BY owner_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching owners:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/truck/active", (req, res) => {
  const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id FROM truck WHERE truck_status = 'Active' ORDER BY truck_id";
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
  const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id FROM truck WHERE truck_status = 'Inactive' ORDER BY truck_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive drivers:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

app.get("/api/truck", (req, res) => {
  const sql = "SELECT uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id FROM truck ORDER BY truck_id";
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
  const getMaxOrderSql = "SELECT COALESCE(MAX(truck_id), 0) + 1 AS next_order FROM truck";

  db.query(getMaxOrderSql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const nextOrder = result[0].next_order;
    const insertSql = "INSERT INTO truck (uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity, insurance_validity, fitness_validity, permit_validity, direct_sale, truck_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(insertSql, [uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity_date || null, insurance_validity_date || null, fitness_validity_date || null, permit_validity_date || null, direct_sale, nextOrder], (insertErr) => {
      if (insertErr) return res.status(500).json({ error: "Database error", details: insertErr.sqlMessage });
      res.json({ message: "Truck added successfully", uuid, truck_id: nextOrder });
    });
  });
});

// Update an existing truck
app.put("/api/truck/:uuid", (req, res) => {
  const { truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, truck_status = "Active", tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;

  if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
    return res.status(400).json({ error: "Required fields: truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id" });
  }

  let updates = [];
  let values = [];

  if (truck_name) updates.push("truck_name = ?"), values.push(truck_name);
  if (empty_weight) updates.push("empty_weight = ?"), values.push(empty_weight);
  if (company) updates.push("company = ?"), values.push(company);
  if (gvw) updates.push("gvw = ?"), values.push(gvw);
  if (reg_date) updates.push("reg_date = ?"), values.push(reg_date);
  if (truck_owner_name) updates.push("truck_owner_name = ?"), values.push(truck_owner_name);
  if (owner_id) updates.push("owner_id = ?"), values.push(owner_id);
  if (truck_status) updates.push("truck_status = ?"), values.push(truck_status);
  if (tax_validity_date) updates.push("tax_validity = ?"), values.push(tax_validity_date);
  if (insurance_validity_date) updates.push("insurance_validity = ?"), values.push(insurance_validity_date);
  if (fitness_validity_date) updates.push("fitness_validity = ?"), values.push(fitness_validity_date);
  if (permit_validity_date) updates.push("permit_validity = ?"), values.push(permit_validity_date);
  if (direct_sale !== undefined) updates.push("direct_sale = ?"), values.push(direct_sale);

  if (updates.length < 7) {
    return res.status(400).json({ error: "At least one additional field must be updated along with required fields" });
  }

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

// Delete a truck and reset status
app.delete("/api/truck/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE truck SET truck_status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating truck status:", err);
      return res.status(500).json({ error: "Failed to update truck status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.json({ message: "Truck status updated to Inactive successfully!" });
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



// // ✅ Fetch all packaging records (Ordered by order_number)

// ✅ Get all packaging materials (ordered by pack_id)
app.get("/api/packaging", (req, res) => {
  const sql = "SELECT uuid, pack_id, material_name, weight, status FROM packaging ORDER BY pack_id";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get a specific packaging material by uuid
app.get("/api/packaging/:uuid", (req, res) => {
  const sql = "SELECT uuid, pack_id, material_name, weight, status FROM packaging WHERE uuid = ?";
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
  const getMaxPackIdSql = "SELECT COALESCE(MAX(pack_id), 0) + 1 AS next_pack_id FROM packaging";

  db.query(getMaxPackIdSql, (err, result) => {
    if (err) {
      console.error("Error getting next pack_id:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextPackId = result[0].next_pack_id;
    const insertSql = "INSERT INTO packaging (uuid, material_name, weight, status, pack_id) VALUES (?, ?, ?, ?, ?)";

    db.query(insertSql, [uuid, material_name, weight, status, nextPackId], (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting packaging material:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({
        message: "Packaging material added successfully",
        uuid,
        pack_id: nextPackId,
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

// ✅ Delete a packaging material and reset pack_id numbers
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

    // Reset pack_id numbers sequentially
    const resetSql1 = "SET @new_pack_id = 0";
    const resetSql2 = "UPDATE packaging SET pack_id = (@new_pack_id := @new_pack_id + 1) ORDER BY pack_id";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting pack_id:", resetErr1);
        return res.status(500).json({ error: "Failed to reset pack_id numbering" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting pack_id:", resetErr2);
          return res.status(500).json({ error: "Failed to reset pack_id" });
        }

        console.log("✅ Pack IDs reset successfully!");
        res.json({ message: "Packaging material deleted and pack_id reset successfully!" });
      });
    });
  });
});


// app.get("/api/packaging", (req, res) => {
//   const sql = "SELECT uuid, order_number, material_name, weight, status FROM packaging ORDER BY order_number";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // ✅ Get a specific packaging material by uuid
// app.get("/api/packaging/:uuid", (req, res) => {
//   const sql = "SELECT uuid, order_number, material_name, weight, status FROM packaging WHERE uuid = ?";
//   db.query(sql, [req.params.uuid], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Packaging material not found" });
//     res.json(results[0]);
//   });
// });

// // ✅ Add a new packaging material
// app.post("/api/packaging", (req, res) => {
//   const { material_name, weight, status = "Start" } = req.body;
//   if (!material_name || !weight) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const uuid = uuidv4();
//   const getMaxOrderSql = "SELECT COALESCE(MAX(order_number), 0) + 1 AS next_order FROM packaging";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) {
//       console.error("Error getting next order number:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const nextOrder = result[0].next_order;
//     const insertSql = "INSERT INTO packaging (uuid, material_name, weight, status, order_number) VALUES (?, ?, ?, ?, ?)";

//     db.query(insertSql, [uuid, material_name, weight, status, nextOrder], (insertErr, insertResult) => {
//       if (insertErr) {
//         console.error("Error inserting packaging material:", insertErr);
//         return res.status(500).json({ error: "Database insertion failed" });
//       }
//       res.status(201).json({
//         message: "Packaging material added successfully",
//         uuid,
//         order_number: nextOrder,
//       });
//     });
//   });
// });

// // ✅ Update an existing packaging material
// app.put("/api/packaging/:uuid", (req, res) => {
//   const { material_name, weight, status } = req.body;
//   if (!material_name || !weight || !status) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const sql = "UPDATE packaging SET material_name = ?, weight = ?, status = ? WHERE uuid = ?";

//   db.query(sql, [material_name, weight, status, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Packaging material not found" });
//     }
//     res.json({ message: "Packaging material updated successfully" });
//   });
// });

// // ✅ Delete a packaging material and reset order numbers
// app.delete("/api/packaging/:uuid", (req, res) => {
//   const { uuid } = req.params;

//   const deleteSql = "DELETE FROM packaging WHERE uuid = ?";
//   db.query(deleteSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error deleting packaging material:", err);
//       return res.status(500).json({ error: "Database deletion failed" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Packaging material not found" });
//     }

//     console.log(`✅ Deleted Packaging Material with UUID: ${uuid}`);

//     // Reset order numbers sequentially
//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE packaging SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

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
//         res.json({ message: "Packaging material deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });




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

// // Get all schemes
// app.get("/api/scheme", (req, res) => {
//   const sql = "SELECT uuid, order_number, scheme_name, scheme_status FROM scheme ORDER BY scheme_name DESC";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });


// // Get a specific scheme by scheme_id
// app.get("/api/scheme/:uuid", (req, res) => {
//   const sql = "SELECT uuid, order_number, scheme_name, scheme_status FROM scheme WHERE uuid = ?";
//   db.query(sql, [req.params.scheme_id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Scheme not found" });
//     res.json(results[0]);
//   });
// });

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


// app.put("/api/scheme/:uuid", (req, res) => {
//   const { scheme_name, scheme_status } = req.body;
//   if (!scheme_name || !scheme_status) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const sql = "UPDATE scheme SET scheme_name = ?, scheme_status = ? WHERE uuid = ?";

//   db.query(sql, [scheme_name, scheme_status, req.params.uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Scheme not found" });
//     }
//     res.json({ message: "Scheme updated successfully" });
//   });
// });




// app.delete("/api/scheme/:uuid", (req, res) => {
//   const { uuid } = req.params;

//   // Step 1: Delete the specific scheme
//   const deleteSql = "DELETE FROM scheme WHERE uuid = ?";
//   db.query(deleteSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error deleting scheme:", err);
//       return res.status(500).json({ error: "Database deletion failed" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Scheme not found" });
//     }

//     console.log(`✅ Deleted Scheme with UUID: ${uuid}`);

//     // Step 2: Reset order numbers sequentially
//     const resetSql1 = "SET @new_order = 0";
//     const resetSql2 = "UPDATE scheme SET order_number = (@new_order := @new_order + 1) ORDER BY order_number";

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
//         res.json({ message: "Scheme deleted and order numbers reset successfully!" });
//       });
//     });
//   });
// });

// Get all schemes
app.get("/api/scheme", (req, res) => {
  const sql = "SELECT uuid, scheme_id, scheme_name, scheme_status FROM scheme ORDER BY scheme_name DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a specific scheme by scheme_id
app.get("/api/scheme/:uuid", (req, res) => {
  const sql = "SELECT uuid, scheme_id, scheme_name, scheme_status FROM scheme WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Scheme not found" });
    res.json(results[0]);
  });
});

// Create new scheme
app.post("/api/scheme", (req, res) => {
  const uuid = uuidv4();
  const { scheme_name, scheme_status } = req.body;
  if (!scheme_name || !scheme_status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const getMaxSchemeIdSql = "SELECT COALESCE(MAX(scheme_id), 0) + 1 AS next_scheme_id FROM scheme";

  db.query(getMaxSchemeIdSql, (err, result) => {
    if (err) {
      console.error("Error getting next scheme ID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextSchemeId = result[0].next_scheme_id;
    const insertSql = "INSERT INTO scheme (uuid, scheme_name, scheme_status, scheme_id) VALUES (?, ?, ?, ?)";

    db.query(insertSql, [uuid, scheme_name, scheme_status, nextSchemeId], (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting scheme:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({
        message: "Scheme added successfully",
        uuid,
        scheme_id: nextSchemeId
      });
    });
  });
});

// Update scheme
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

// Delete scheme
app.delete("/api/scheme/:uuid", (req, res) => {
  const { uuid } = req.params;

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

    const resetSql1 = "SET @new_scheme_id = 0";
    const resetSql2 = "UPDATE scheme SET scheme_id = (@new_scheme_id := @new_scheme_id + 1) ORDER BY scheme_id";

    db.query(resetSql1, (resetErr1) => {
      if (resetErr1) {
        console.error("Error resetting scheme IDs:", resetErr1);
        return res.status(500).json({ error: "Failed to reset scheme IDs" });
      }

      db.query(resetSql2, (resetErr2) => {
        if (resetErr2) {
          console.error("Error resetting scheme IDs:", resetErr2);
          return res.status(500).json({ error: "Failed to reset scheme IDs" });
        }

        console.log("✅ Scheme IDs reset successfully!");
        res.json({ message: "Scheme deleted and scheme IDs reset successfully!" });
      });
    });
  });
});



// **End of Schemes**
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///tapa
app.get("/tapa/mswc", (req, res) => {
  const query = "SELECT godownName FROM mswc_godowns WHERE status = 'Active'"; // Fetch only godownname

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(results);
  });
});

app.get("/tapa/subgodown", (req, res) => {
  const query = "SELECT subGodown FROM sub_godown WHERE status = 'Active'"; // Fetch only godownname

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(results);
  });
});

app.get("/tapa/owner", (req, res) => {
  const query = "SELECT ownerName FROM owners "; // Fetch only godownname

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching godown names:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    res.json(results);
  });
});

// Get all active transport records
app.get("/api/tapa/active", (req, res) => {
  const sql = "SELECT * FROM transport WHERE status = 'Active' ORDER BY trans_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching active transport:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get all inactive transport records
app.get("/api/tapa/inactive", (req, res) => {
  const sql = "SELECT * FROM transport WHERE status = 'Inactive' ORDER BY trans_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching inactive transport:", err);
      return res.status(500).json({ error: "Database fetch error" });
    }
    res.json(results);
  });
});

// Get all transport records
// app.get("/api/transport", (req, res) => {
//   const sql = "SELECT * FROM transport ORDER BY trans_id DESC";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

app.get("/api/transport", (req, res) => {
  const sql = `
    SELECT 
      t.*,
      bd.godownName AS baseDepoName,
      g.subGodown AS godownName,
      tr.truck_name AS truckName,
      o.ownerName AS ownerName,
      d.driver_name AS driverName,
      s.scheme_name AS schemeName,
      p.material_name AS packagingName
    FROM transport t
    LEFT JOIN mswc_godowns bd ON t.baseDepo = bd.mswc_id
    LEFT JOIN sub_godown g ON t.godown = g.subgodown_id
    LEFT JOIN truck tr ON t.truck = tr.truck_id
    LEFT JOIN owners o ON t.owner = o.owner_id
    LEFT JOIN drivers d ON t.driver = d.driver_id
    LEFT JOIN scheme s ON t.scheme = s.scheme_id
    LEFT JOIN packaging p ON t.packaging = p.pack_id
    ORDER BY t.trans_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    console.error("SQL Error:", err);
    res.json(results);
  });
});




// Get single transport record by UUID
app.get("/api/transport/:uuid", (req, res) => {
  const sql = "SELECT * FROM transport WHERE uuid = ?";
  db.query(sql, [req.params.uuid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Record not found" });
    res.json(results[0]);
  });
});

// Add new transport record
app.post("/api/transport", (req, res) => {
  const uuid = uuidv4();
  const {
    baseDepo, doNo, godown, truck, owner, driver, emptyWeight, grossWeight,
    scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, netWeight,
    dispatchDate, quota, tpNo, allocation, status = "Active"
  } = req.body;

  if (!baseDepo || !doNo || !godown || !truck || !owner || !driver || !emptyWeight || !grossWeight ||
      !scheme || !packaging || !noOfBags || !bardanWeight || !loadedNetWeight || !netWeight ||
      !dispatchDate || !quota || !tpNo || !allocation || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const getMaxTransIdSql = "SELECT COALESCE(MAX(trans_id), 0) + 1 AS next_trans_id FROM transport";

  db.query(getMaxTransIdSql, (err, result) => {
    if (err) {
      console.error("Error getting next trans_id:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextTransId = result[0].next_trans_id;
    const insertSql = `INSERT INTO transport 
      (uuid, trans_id, baseDepo, doNo, godown, truck, owner, driver, emptyWeight, 
      grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, 
      netWeight, dispatchDate, quota, tpNo, allocation, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(insertSql, [
      uuid, nextTransId, baseDepo, doNo, godown, truck, owner, driver, emptyWeight,
      grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight,
      netWeight, dispatchDate, quota, tpNo, allocation, status
    ], (insertErr) => {
      if (insertErr) {
        console.error("Error inserting transport record:", insertErr);
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(201).json({
        message: "Transport record added successfully",
        uuid,
        trans_id: nextTransId
      });
    });
  });
});

// Update transport record
app.put("/api/transport/:uuid", (req, res) => {
  const {
    baseDepo, doNo, godown, truck, owner, driver, emptyWeight, grossWeight,
    scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, netWeight,
    dispatchDate, quota, tpNo, allocation, status = "Active"
  } = req.body;

  if (!baseDepo || !doNo || !godown || !truck || !owner || !driver || !emptyWeight || !grossWeight ||
      !scheme || !packaging || !noOfBags || !bardanWeight || !loadedNetWeight || !netWeight ||
      !dispatchDate || !quota || !tpNo || !allocation) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  let updates = [];
  let values = [];

  if (baseDepo) updates.push("baseDepo = ?"), values.push(baseDepo);
  if (doNo) updates.push("doNo = ?"), values.push(doNo);
  if (godown) updates.push("godown = ?"), values.push(godown);
  if (truck) updates.push("truck = ?"), values.push(truck);
  if (owner) updates.push("owner = ?"), values.push(owner);
  if (driver) updates.push("driver = ?"), values.push(driver);
  if (emptyWeight) updates.push("emptyWeight = ?"), values.push(emptyWeight);
  if (grossWeight) updates.push("grossWeight = ?"), values.push(grossWeight);
  if (scheme) updates.push("scheme = ?"), values.push(scheme);
  if (packaging) updates.push("packaging = ?"), values.push(packaging);
  if (noOfBags) updates.push("noOfBags = ?"), values.push(noOfBags);
  if (bardanWeight) updates.push("bardanWeight = ?"), values.push(bardanWeight);
  if (loadedNetWeight) updates.push("loadedNetWeight = ?"), values.push(loadedNetWeight);
  if (netWeight) updates.push("netWeight = ?"), values.push(netWeight);
  if (dispatchDate) updates.push("dispatchDate = ?"), values.push(dispatchDate);
  if (quota) updates.push("quota = ?"), values.push(quota);
  if (tpNo) updates.push("tpNo = ?"), values.push(tpNo);
  if (allocation) updates.push("allocation = ?"), values.push(allocation);
  if (status) updates.push("status = ?"), values.push(status);

  if (updates.length < 5) {
    return res.status(400).json({ error: "At least one additional field must be updated along with required fields" });
  }

  const sql = `UPDATE transport SET ${updates.join(", ")} WHERE uuid = ?`;
  values.push(req.params.uuid);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating transport record:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Transport record updated successfully" });
  });
});

// Soft delete a transport record
app.delete("/api/transport/:uuid", (req, res) => {
  const { uuid } = req.params;
  const updateSql = "UPDATE transport SET status = 'Inactive' WHERE uuid = ?";

  db.query(updateSql, [uuid], (err, result) => {
    if (err) {
      console.error("Error updating transport status:", err);
      return res.status(500).json({ error: "Failed to update transport status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.json({ message: "Transport status updated to Inactive successfully!" });
  });
});

// app.get("/tapa/truck", (req, res) => {
//   const query = "SELECT truck_name, empty_weight FROM truck WHERE truck_status = 'Active'"; // Fetch only godownname

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching godown names:", err);
//       return res.status(500).json({ error: "Database query error" });
//     }

//     res.json(results);
//   });
// });
// app.get("/tapa/driver", (req, res) => {
//   const query = "SELECT driver_name FROM drivers "; // Fetch only godownname

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching godown names:", err);
//       return res.status(500).json({ error: "Database query error" });
//     }

//     res.json(results);
//   });
// });
// app.get("/tapa/scheme", (req, res) => {
//   const query = "SELECT scheme_name FROM scheme "; // Fetch only godownname

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching godown names:", err);
//       return res.status(500).json({ error: "Database query error" });
//     }

//     res.json(results);
//   });
// });
// app.get("/tapa/pkg", (req, res) => {
//   const query = "SELECT material_name, weight FROM packaging "; // Fetch only godownname

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching godown names:", err);
//       return res.status(500).json({ error: "Database query error" });
//     }

//     res.json(results);
//   });
// });


// app.get("/api/tapa/active", (req, res) => {
//   const sql = "SELECT * FROM transport WHERE status = 'Active' ORDER BY orderNumber";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching active drivers:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });

// // Get only "Inactive" drivers
// app.get("/api/tapa/inactive", (req, res) => {
//     const sql = "SELECT * FROM transport WHERE status = 'Inactive' ORDER BY orderNumber";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching inactive drivers:", err);
//       return res.status(500).json({ error: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });


// // Get all transport records
// app.get("/api/transport", (req, res) => {
//   const sql = "SELECT * FROM transport ORDER BY orderNumber DESC";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Get a specific transport record by uuid
// app.get("/api/transport/:uuid", (req, res) => {
//   const sql = "SELECT * FROM transport WHERE uuid = ?";
//   db.query(sql, [req.params.uuid], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "Record not found" });
//     res.json(results[0]);
//   });
// });

// // Add a new transport record
// app.post("/api/transport", (req, res) => {
//   const uuid = uuidv4(); // Generate a unique UUID
//   const {
//     baseDepo, doNo, godown, truck, owner, driver, emptyWeight, grossWeight,
//     scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, netWeight,
//     dispatchDate, quota, tpNo, allocation, status = "Active"
//   } = req.body;

//   if (!baseDepo || !doNo || !godown || !truck || !owner || !driver || !emptyWeight || !grossWeight ||
//       !scheme || !packaging || !noOfBags || !bardanWeight || !loadedNetWeight || !netWeight ||
//       !dispatchDate || !quota || !tpNo || !allocation || !status) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const getMaxOrderSql = "SELECT COALESCE(MAX(orderNumber), 0) + 1 AS next_order FROM transport";

//   db.query(getMaxOrderSql, (err, result) => {
//     if (err) {
//       console.error("Error getting next order number:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const nextOrder = result[0].next_order;
//     const insertSql = `INSERT INTO transport 
//       (uuid, orderNumber, baseDepo, doNo, godown, truck, owner, driver, emptyWeight, 
//       grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, 
//       netWeight, dispatchDate, quota, tpNo, allocation, status) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     db.query(insertSql, [
//       uuid, nextOrder, baseDepo, doNo, godown, truck, owner, driver, emptyWeight,
//       grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight,
//       netWeight, dispatchDate, quota, tpNo, allocation, status
//     ], (insertErr) => {
//       if (insertErr) {
//         console.error("Error inserting transport record:", insertErr);
//         return res.status(500).json({ error: "Database insertion failed" });
//       }
//       res.status(201).json({
//         message: "Transport record added successfully",
//         uuid,
//         orderNumber: nextOrder
//       });
//     });
//   });
// });

// // // Update a transport record
// app.put("/api/transport/:uuid", (req, res) => {
//   const { baseDepo, doNo, godown, truck, owner, driver, emptyWeight, grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, netWeight, dispatchDate, quota, tpNo, allocation, status = "Active" } = req.body;

//   // Ensure required fields are present
//   if (!baseDepo || !doNo || !godown || !truck || !owner || !driver || !emptyWeight || !grossWeight || !scheme || !packaging || !noOfBags || !bardanWeight || !loadedNetWeight || !netWeight || !dispatchDate || !quota || !tpNo || !allocation) {
//     return res.status(400).json({ error: "Required fields are missing" });
//   }

//   // Prepare dynamic update query
//   let updates = [];
//   let values = [];

//   if (baseDepo) updates.push("baseDepo = ?"), values.push(baseDepo);
//   if (doNo) updates.push("doNo = ?"), values.push(doNo);
//   if (godown) updates.push("godown = ?"), values.push(godown);
//   if (truck) updates.push("truck = ?"), values.push(truck);
//   if (owner) updates.push("owner = ?"), values.push(owner);
//   if (driver) updates.push("driver = ?"), values.push(driver);
//   if (emptyWeight) updates.push("emptyWeight = ?"), values.push(emptyWeight);
//   if (grossWeight) updates.push("grossWeight = ?"), values.push(grossWeight);
//   if (scheme) updates.push("scheme = ?"), values.push(scheme);
//   if (packaging) updates.push("packaging = ?"), values.push(packaging);
//   if (noOfBags) updates.push("noOfBags = ?"), values.push(noOfBags);
//   if (bardanWeight) updates.push("bardanWeight = ?"), values.push(bardanWeight);
//   if (loadedNetWeight) updates.push("loadedNetWeight = ?"), values.push(loadedNetWeight);
//   if (netWeight) updates.push("netWeight = ?"), values.push(netWeight);
//   if (dispatchDate) updates.push("dispatchDate = ?"), values.push(dispatchDate);
//   if (quota) updates.push("quota = ?"), values.push(quota);
//   if (tpNo) updates.push("tpNo = ?"), values.push(tpNo);
//   if (allocation) updates.push("allocation = ?"), values.push(allocation);
//   if (status) updates.push("status = ?"), values.push(status);

//   // Ensure at least one additional field is updated
//   if (updates.length < 5) {
//     return res.status(400).json({ error: "At least one additional field must be updated along with required fields" });
//   }

//   // Construct SQL query
//   const sql = `UPDATE transport SET ${updates.join(", ")} WHERE uuid = ?`;
//   values.push(req.params.uuid);

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error updating transport record:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Record not found" });
//     }
//     res.json({ message: "Transport record updated successfully" });
//   });
// });
// app.delete("/api/transport/:uuid", (req, res) => {
//   const { uuid } = req.params;
//   const updateSql = "UPDATE transport SET status = 'Inactive' WHERE uuid = ?";

//   db.query(updateSql, [uuid], (err, result) => {
//     if (err) {
//       console.error("Error updating truck status:", err);
//       return res.status(500).json({ error: "Failed to update truck status" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "truck not found" });
//     }
//     res.json({ message: "truck status updated to Inactive successfully!" });
//   });
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////
////Do
// Get all records from 'do' table
app.get("/api/do", (req, res) => {
  const sql = "SELECT stock_id, do_no, scheme_id, cota, do_date, godown_id, grain_id, quintal, quantity, total_amount, expire_date FROM do ORDER BY stock_id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a specific record from 'do' table by do_no
app.get("/api/do/:do_no", (req, res) => {
  const sql = "SELECT stock_id, do_no, scheme_id, cota, do_date, godown_id, grain_id, quintal, quantity, total_amount, expire_date FROM do WHERE do_no = ?";
  db.query(sql, [req.params.do_no], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Record not found" });
    res.json(results[0]);
  });
});



// app.post("/api/do", (req, res) => {
//   const {
//     doNo,
//     baseDepot,
//     doDate,
//     doExpiryDate,
//     scheme,
//     grain,
//     quantity,
//     quintal,
//     total_amount,
//     expire_date,
//     entries // <-- Entries from secondForm
//   } = req.body;

//   // 1. First insert into DO table
//   const insertDoSql = `
//     INSERT INTO do (do_no, godown_id, do_date, cota, scheme_id, grain_id, quantity, quintal, total_amount, expire_date)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     insertDoSql,
//     [doNo, baseDepot, doDate, doExpiryDate, scheme, grain, quantity, quintal, total_amount, expire_date],
//     (err, result) => {
//       if (err) {
//         console.error("❌ Error inserting DO:", err);
//         return res.status(500).json({ error: "Failed to insert DO" });
//       }

//       const insertedDoId = result.insertId;

//       // 2. If no entries are provided, return success just for DO
//       if (!entries || entries.length === 0) {
//         return res.json({
//           message: "✅ DO inserted (no entries)",
//           do_id: insertedDoId
//         });
//       }

//       // 3. Prepare entries for bulk insertion
//       const insertEntriesSql = `
//         INSERT INTO do_entries (do_id, godown, vahtuk, quantity)
//         VALUES ?
//       `;

//       const entryValues = entries.map(entry => [
//         doNo,
//         entry.godown,
//         entry.vahtuk,
//         entry.quantity
//       ]);

//       // 4. Insert entries
//       db.query(insertEntriesSql, [entryValues], (entryErr, entryResult) => {
//         if (entryErr) {
//           console.error("❌ Error inserting DO entries:", entryErr);
//           return res.status(500).json({
//             error: "DO inserted but failed to insert entries",
//             do_id: insertedDoId
//           });
//         }

//         // 5. Return success response
//         res.json({
//           message: "✅ DO and entries inserted successfully",
//           do_id: insertedDoId,
//           entries_inserted: entryResult.affectedRows
//         });
//       });
//     }
//   );
// });



app.post("/api/do", (req, res) => {
  const {
    doNo,
    baseDepot,
    doDate,
    doExpiryDate,
    scheme,
    grain,
    quantity,
    quintal,
    total_amount,
    expire_date,
    entries // <-- This is now an object with comma-separated strings
  } = req.body;

  // 1. Insert into DO table
  const insertDoSql = `
    INSERT INTO do (do_no, godown_id, do_date, cota, scheme_id, grain_id, quantity, quintal, total_amount, expire_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertDoSql,
    [doNo, baseDepot, doDate, doExpiryDate, scheme, grain, quantity, quintal, total_amount, expire_date],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting DO:", err);
        return res.status(500).json({ error: "Failed to insert DO" });
      }

      const insertedDoId = result.insertId;

      // 2. No entries? Just return DO success
      if (!entries || !entries.godown) {
        return res.json({
          message: "✅ DO inserted (no entries)",
          do_id: insertedDoId
        });
      }

      // 3. Split comma-separated strings
      const godowns = entries.godown.split("|");
      const vahtuks = entries.vahtuk.split("|");
      const quantities = entries.quantity.split("|");

      if (godowns.length !== vahtuks.length || vahtuks.length !== quantities.length) {
        return res.status(400).json({ error: "Mismatched entry lengths" });
      }

      const entryValues = godowns.map((_, i) => [
        doNo,
        godowns[i].trim(),
        vahtuks[i].trim(),
        parseFloat(quantities[i])
      ]);

      // 4. Insert do_entries
      const insertEntriesSql = `
        INSERT INTO do_entries (do_id, godown, vahtuk, quantity)
        VALUES ?
      `;

      db.query(insertEntriesSql, [entryValues], (entryErr, entryResult) => {
        if (entryErr) {
          console.error("❌ Error inserting DO entries:", entryErr);
          return res.status(500).json({
            error: "DO inserted but failed to insert entries",
            do_id: insertedDoId
          });
        }

        res.json({
          message: "✅ DO and entries inserted successfully",
          do_id: insertedDoId,
          entries_inserted: entryResult.affectedRows
        });
      });
    }
  );
});


// Assuming you're using Express and connected to a MySQL or MongoDB DB
app.put("/api/do/:stock_id", (req, res) => {
  const { stock_id } = req.params;
  const {
    doNo,
    baseDepot,
    doDate,
    doExpiryDate,
    scheme,
    grain,
    quantity
  } = req.body;

  const updateQuery = `
    UPDATE do 
    SET 
      do_no = ?, 
      godown_id = ?, 
      do_date = ?, 
      cota = ?, 
      scheme_id = ?, 
      grain_id = ?, 
      quantity = ?
    WHERE stock_id = ?
  `;

  const values = [
    doNo,
    baseDepot,
    doDate,
    doExpiryDate,
    scheme,
    grain,
    quantity,
    stock_id
  ];

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("Error updating DO:", err);
      return res.status(500).json({ message: "Server error while updating DO" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "DO not found" });
    }

    res.json({ message: "DO updated successfully" });
  });
});



////////////////////////////////////////////////////////////////////////////////////////////////
////Do Alloc
app.get("/api/alloc", (req, res) => {
  const sql = "SELECT * FROM do_entries ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a specific record from 'do' table by do_no
app.get("/api/alloc/:do_allocate_id", (req, res) => {
  const sql = "SELECT * FROM do_alloc WHERE do_allocate_id = ?";
  db.query(sql, [req.params.do_no], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Record not found" });
    res.json(results[0]);
  });
});


////////////
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
      (SELECT COUNT(*) FROM grains) AS table10_count,
      (SELECT COUNT(*) FROM categories) AS table11_count,
      
      (SELECT MAX(last_modified) FROM owners) AS last_modified_owners,
      (SELECT MAX(last_modified) FROM employee) AS last_modified_employee,
      (SELECT MAX(last_modified) FROM mswc_godowns) AS last_modified_mswc,
      (SELECT MAX(last_modified) FROM sub_godown) AS last_modified_sub_godown,
      (SELECT MAX(last_modified) FROM truck) AS last_modified_truck,
      (SELECT MAX(last_modified) FROM scheme) AS last_modified_scheme,
      (SELECT MAX(last_modified) FROM packaging) AS last_modified_packaging,
      (SELECT MAX(last_modified) FROM drivers) AS last_modified_drivers,
      (SELECT MAX(last_modified) FROM grains) AS last_modified_grains,
      (SELECT MAX(last_modified) FROM categories) AS last_modified_categories
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
      graincount: counts.table10_count,
      categorycount: counts.table11_count,

      lastModifiedOwners: formatDateTime(counts.last_modified_owners),
      lastModifiedEmployee: formatDateTime(counts.last_modified_employee),
      lastModifiedMSWC: formatDateTime(counts.last_modified_mswc),
      lastModifiedSubGodown: formatDateTime(counts.last_modified_sub_godown),
      lastModifiedTruck: formatDateTime(counts.last_modified_truck),
      lastModifiedScheme: formatDateTime(counts.last_modified_scheme),
      lastModifiedPackaging: formatDateTime(counts.last_modified_packaging),
      lastModifieddriver: formatDateTime(counts.last_modified_drivers),
      lastModifiedGrain: formatDateTime(counts.last_modified_grains),
      lastModifiedCategory: formatDateTime(counts.last_modified_categories),
    });
  });
});





///////////////////////////////////////////////////////////////////////////////////////////

// **Server Listening**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});