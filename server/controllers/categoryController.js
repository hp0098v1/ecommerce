const _ = require("lodash");

const Category = require("../models/Category");
const { errorHandler } = require("../lib/utils/errorHandler");
const { saveImage, deleteImage } = require("../lib/utils/imageHelper");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("image");

    if (categories.length === 0)
      return res.status(200).json({ message: "No Category found!" });

    res.status(200).json(categories);
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Product.findById(categoryId).populate("image");

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!name) return errorHandler(res, 400, "Please provide a name");

    const newCategory = new Category({
      name,
    });

    // Save image to db
    const newImage = await saveImage({
      filename: image.filename,
      path: image.path,
      imageableId: newCategory._id,
      imageableType: "Category",
    });

    newCategory.image = newImage._id;
    await newCategory.save();

    res.status(201).json({ message: "Category added successfuly!" });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file;
    const categoryId = req.params.categoryId;

    const oldCategory = await Category.findById(categoryId).populate("image");

    if (name) oldCategory.name = name;
    if (image) {
      deleteImage(oldCategory.image._id, oldCategory.image.path);

      const newImage = await saveImage(image);
      oldCategory.image = newImage._id;
    }

    await oldCategory.save();
    res.status(200).json({ message: "Category updated successfuly." });
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(
      categoryId
    ).populate("image");
    if (!deletedCategory) return errorHandler(res, 400, "Category not found!");

    await deleteImage(deletedCategory.image._id, deletedCategory.image.path);

    res.status(200).json({ message: "Category deleted successfuly." });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
