const db = require("../config/db");

class Category {
  // Get all categories
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM categories";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get category by ID
  static getById(category_id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM categories WHERE category_id = ?";
      db.query(sql, [category_id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  // Add a new category
  static add({ category_name, description }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO categories (category_name, description) VALUES (?, ?)";
      db.query(sql, [category_name, description], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Update a category
  static update(category_id, { category_name, description }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE categories SET category_name = ?, description = ? WHERE category_id = ?";
      db.query(sql, [category_name, description, category_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Delete a category
  static delete(category_id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM categories WHERE category_id = ?";
      db.query(sql, [category_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Category;