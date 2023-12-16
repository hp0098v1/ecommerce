const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

// Protected routes
router.use(authenticateToken);

// Admin routes
router.use(authorizeAdmin);
router.post("/", productController.createProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
