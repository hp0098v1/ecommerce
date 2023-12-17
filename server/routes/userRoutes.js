// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const { uploadUser } = require("../middlewares/uploadMiddleware");

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/refresh", userController.refresh);
router.get("/logout", userController.logout);

// Protected routes
router.use(authenticateToken);
router.get("/me", userController.getMe);
router.put(
  "/me/:userId",
  uploadUser.single("imageUrl"),
  userController.updateUser
);

// Admin routes
router.use(authorizeAdmin);
router.get("/admin", userController.admin);

module.exports = router;
