const _ = require("lodash");

const Product = require("../models/Product");
const { errorHandler } = require("../lib/utils/errorHandler");
const {
  createProductValidation,
  updateProductValidation,
} = require("../lib/validations/productValidations");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("image");

    if (products.length === 0)
      return res.status(200).json({ message: "No Product found!" });

    res.status(200).json(products);
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId).populate("image");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = createProductValidation.validate(req.body);

    if (error) return errorHandler(res, 400, error?.message);

    const { name, price, description, imageId } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      image: imageId,
    });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfuly!" });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, imageId } = req.body;

    // check req.body validation
    const { error } = updateProductValidation.validate(req.body);

    if (error) return errorHandler(res, 400, error?.message);

    // update product
    const oldProduct = await Product.findById(productId);
    if (!oldProduct) return errorHandler(res, 400, "Product not found!");

    if (name) oldProduct.name = name;
    if (description) oldProduct.description = description;
    if (price) oldProduct.price = price;
    if (imageId) oldProduct.image = imageId;

    const newProduct = await oldProduct.save();
    res.status(200).json({ message: "Product updated successfuly." });
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) return errorHandler(res, 400, "Product not found!");

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
