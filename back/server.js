const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db"); // Import the centralized database connection

const app = express();
app.use(express.json());
app.use(cors());

// Check Database Connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the application if the database connection fails
  }
  console.log("Connected to MySQL database.");
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const allocRoutes = require("./routes/allocRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const doRoutes = require("./routes/doRoutes");
const driverRoutes = require("./routes/driverRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const grainRoutes = require("./routes/grainRoutes");
const mswcRoutes = require("./routes/mswcRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const packagingRoutes = require("./routes/packagingRoutes");
const rowCountRoutes = require("./routes/rowCountRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const subGodownRoutes = require("./routes/subGodownRoutes");
const transportRoutes = require("./routes/transportRoutes");
const truckRoutes = require("./routes/truckRoutes");
const firstreportRoutes = require("./routes/fristreportRoutes");

// Use Routes
app.use("/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/do", doRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/grains", grainRoutes);
app.use("/api/mswc", mswcRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/packaging", packagingRoutes);
app.use("/api/getRowCounts", rowCountRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/subgodowns", subGodownRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/alloc",allocRoutes );
app.use('/api', firstreportRoutes);

// Server Listening
const PORT = process.env.PORT ; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});