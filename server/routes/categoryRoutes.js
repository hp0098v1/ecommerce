const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const { uploadCategory } = require("../middlewares/uploadMiddleware");

router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);

router.use(authenticateToken);
router.use(authorizeAdmin);
router.post(
  "/",
  uploadCategory.single("imageUrl"),
  categoryController.createCategory
);
router.put(
  "/:categoryId",
  uploadCategory.single("imageUrl"),
  categoryController.updateCategory
);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
