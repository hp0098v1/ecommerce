// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
