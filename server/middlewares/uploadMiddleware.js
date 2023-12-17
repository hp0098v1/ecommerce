const fs = require("fs");
const multer = require("multer");

const storage = (uploadDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported."), false);
  }
};

const productsStorage = storage("public/images/products");
const categoriesStorage = storage("public/images/categories");
const usersStorage = storage("public/images/users");

const uploadProduct = multer({ storage: productsStorage, fileFilter });
const uploadCategory = multer({ storage: categoriesStorage, fileFilter });
const uploadUser = multer({ storage: usersStorage, fileFilter });

module.exports = { uploadProduct, uploadCategory, uploadUser };
