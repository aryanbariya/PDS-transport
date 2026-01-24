const db = require("../config/db");

class Category {
  // Get paginated categories
  static getAll(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM categories ORDER BY category_id ASC LIMIT ? OFFSET ?";
      db.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Get total categories count
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total FROM categories";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
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