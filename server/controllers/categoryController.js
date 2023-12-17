const Category = require("../models/Category");
const { errorHandler } = require("../lib/utils/errorHandler");
const deleteFileMiddleware = require("../middlewares/deleteFileMiddleware");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0)
      return res.status(200).json({ message: "No Category found!" });

    res.status(200).json({ categories });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file.path;

    if (!name) return errorHandler(res, 400, "Please provide a name");

    const newCategory = new Category({
      name,
      imageUrl,
    });

    await newCategory.save();

    res.status(201).json({ category: newCategory });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file.path;
    const categoryId = req.params.categoryId;

    const oldCategory = await Category.findById(categoryId);

    if (name) oldCategory.name = name;
    if (imageUrl) {
      deleteFileMiddleware(oldCategory.imageUrl);

      oldCategory.imageUrl = imageUrl;
    }

    await oldCategory.save();
    res.status(200).json({ category: oldCategory });
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) return errorHandler(res, 400, "Category not found!");

    deleteFileMiddleware(deletedCategory.imageUrl);

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
