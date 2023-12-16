const _ = require("lodash");

const Product = require("../models/Product");
const Image = require("../models/Image");
const { errorHandler } = require("../lib/utils/errorHandler");
const {
  createProductValidation,
  updateProductValidation,
} = require("../lib/validations/productValidations");
const { saveImage, deleteImage } = require("../lib/utils/imageHelper");

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

    const { name, price, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
    });

    if (!newProduct) return errorHandler(res, 400, "Product creation failed!");

    const image = await saveImage({
      filename: req.file.filename,
      path: req.file.path,
      imageableId: newProduct._id,
      imageableType: "Product",
    });

    newProduct.image = image._id;
    await newProduct.save();

    res.status(201).json({ message: "Product added successfuly!" });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price } = req.body;
    const image = req.file;

    // check req.body validation
    const { error } = updateProductValidation.validate(req.body);

    if (error) return errorHandler(res, 400, error?.message);

    // update product
    const oldProduct = await Product.findById(productId).populate("image");
    if (!oldProduct) return errorHandler(res, 400, "Product not found!");

    if (name) oldProduct.name = name;
    if (description) oldProduct.description = description;
    if (price) oldProduct.price = price;
    if (image) {
      deleteImage(oldProduct.image._id, oldProduct.image.path);

      const newImage = await saveImage(image);
      oldProduct.image = newImage._id;
    }

    await oldProduct.save();
    res.status(200).json({ message: "Product updated successfuly." });
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId).populate(
      "image"
    );

    if (!deletedProduct) return errorHandler(res, 400, "Product not found!");

    await deleteImage(deletedProduct.image._id, deletedProduct.image.path);

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
