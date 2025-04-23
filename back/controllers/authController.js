const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");
const secretKey = process.env.JWT_SECRET || "your_default_secret_key";

// **Signup API**
exports.signup = async (req, res) => {
  try {
    const { name, surname, phone_number, email, password } = req.body;

    if (!name || !surname || !phone_number || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await Auth.registerUser({ name, surname, phone_number, email, password: hashedPassword });
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Database error: " + err.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// **Login API**
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};