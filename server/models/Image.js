const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  imageableType: {
    type: String,
    enum: ["Product", "Category", "User"],
  },
  imageableId: { type: mongoose.Schema.Types.ObjectId },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
