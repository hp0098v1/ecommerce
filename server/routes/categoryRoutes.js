const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);

router.use(authenticateToken);
router.use(authorizeAdmin);
router.post("/", upload.single("image"), categoryController.createCategory);
router.put(
  "/:categoryId",
  upload.single("image"),
  categoryController.updateCategory
);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
