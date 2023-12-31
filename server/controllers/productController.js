const _ = require("lodash");

const Product = require("../models/Product");
const Category = require("../models/Category");
const { errorHandler } = require("../lib/utils/errorHandler");
const {
  createProductValidation,
  updateProductValidation,
} = require("../lib/validations/productValidations");
const deleteFileMiddleware = require("../middlewares/deleteFileMiddleware");

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let populateFields = [];
    const allowedFields = ["categoryId"];
    const categories = req.query.categories;

    if (req.query.populate) {
      populateFields = req.query.populate
        .split(",")
        .filter((field) => allowedFields.includes(field));
    }

    let products = [];
    let total = 0;

    if (categories?.length === 0 || categories === undefined) {
      products = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate(populateFields);

      total = await Product.countDocuments();
    } else {
      products = await Product.find({
        categoryId: {
          $in: categories,
        },
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate(populateFields);

      total = await Product.countDocuments({
        categoryId: { $in: categories },
      });
    }

    if (products.length === 0)
      return res.status(200).json({ message: "No Product found!" });

    res.status(200).json({
      products,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 400, error?.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    let populateFields = [];
    const allowedFields = ["categoryId"];

    if (req.query.populate) {
      populateFields = req.query.populate
        .split(",")
        .filter((field) => allowedFields.includes(field));
    }

    const product = await Product.findById(productId).populate(populateFields);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = createProductValidation.validate(req.body);

    if (error) return errorHandler(res, 400, error?.message);

    const { name, price, description, inStuck, categoryId } = req.body;
    const imageUrl = req.file.path;

    const categoryExist = await Category.findById(categoryId);
    if (!categoryExist) return errorHandler(res, 400, "Category not found!");

    const newProduct = new Product({
      name,
      price,
      description,
      inStuck,
      categoryId,
      imageUrl,
    });

    if (!newProduct) return errorHandler(res, 400, "Product creation failed!");

    await newProduct.save();

    res.status(201).json({ product: newProduct });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, inStuck, categoryId } = req.body;
    const imageUrl = req.file.path;

    // check req.body validation
    const { error } = updateProductValidation.validate(req.body);

    if (error) return errorHandler(res, 400, error?.message);

    // update product
    const oldProduct = await Product.findById(productId);
    if (!oldProduct) return errorHandler(res, 400, "Product not found!");

    if (name) oldProduct.name = name;
    if (description) oldProduct.description = description;
    if (price) oldProduct.price = price;
    if (inStuck) oldProduct.inStuck = inStuck;
    if (categoryId) {
      const categoryExist = await Category.findById(categoryId);
      if (!categoryExist) return errorHandler(res, 400, "Category not found!");

      oldProduct.categoryId = categoryId;
    }
    if (imageUrl) {
      deleteFileMiddleware(oldProduct.imageUrl);

      oldProduct.imageUrl = imageUrl;
    }

    await oldProduct.save();
    res.status(200).json({ product: oldProduct });
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) return errorHandler(res, 400, "Product not found!");
    deleteFileMiddleware(deletedProduct.imageUrl);

    res.status(200).json({ message: "Product deleted successfuly." });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
