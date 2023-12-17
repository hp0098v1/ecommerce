// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
