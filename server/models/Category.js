// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String, // URL of the category image
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
