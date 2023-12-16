const fs = require("fs");

const Image = require("../../models/Image");

const saveImage = async (image) => {
  const newImage = new Image(image);

  if (!newImage) return errorHandler(res, 400, "Image not added!");
  await newImage.save();

  return newImage;
};

const deleteImage = async (imageId, filePath) => {
  // delete from db
  await Image.findByIdAndDelete(imageId);

  // delete from local
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${filePath}`, err);
    } else {
      console.log(`File deleted successfully: ${filePath}`);
    }
  });
};

module.exports = { saveImage, deleteImage };
