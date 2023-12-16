const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

// Protected routes
router.use(authenticateToken);

// Admin routes
router.use(authorizeAdmin);
router.post("/", upload.single("image"), productController.createProduct);
router.put(
  "/:productId",
  upload.single("image"),
  productController.updateProduct
);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
