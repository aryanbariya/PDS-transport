const db = require("../config/db");

class Auth {
  // Insert a new user into the signup table
  static registerUser({ name, surname, phone_number, email, password }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO signup (name, surname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [name, surname, phone_number, email, password], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Find a user by email
  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM signup WHERE email = ?";
      db.query(sql, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }
}

module.exports = Auth;