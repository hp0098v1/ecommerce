const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const fileController = require("../controllers/fileController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken);
router.use(authorizeAdmin);
router.get("/", fileController.getAllImages);
router.post("/upload", upload.single("image"), fileController.upload);
router.delete("/delete/:imageId", fileController.deleteImage);

module.exports = router;
