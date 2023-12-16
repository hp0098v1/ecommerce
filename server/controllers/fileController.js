const Image = require("../models/Image");
const deleteFileMiddleware = require("../middlewares/deleteFileMiddleware");
const { errorHandler } = require("../lib/utils/errorHandler");

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();

    if (images.length === 0)
      return res.status(200).json({ message: "No Image found!" });

    res.status(200).json(images);
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded");
    }

    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
    });

    await newImage.save();
    res.json(newImage);
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    // Retrieve image information from MongoDB
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the file using the middleware
    deleteFileMiddleware(image.path);

    // Remove the image information from MongoDB
    await Image.findByIdAndDelete(imageId);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting image" });
  }
};

module.exports = { getAllImages, upload, deleteImage };
