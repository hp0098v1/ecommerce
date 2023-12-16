// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.use(authenticateToken);
router.get("/me/:userId", userController.getMe);
router.put("/me/:userId", userController.updateUser);
router.get("/refresh", userController.refresh);
router.get("/logout", userController.logout);

// Admin routes
router.use(authorizeAdmin);
router.get("/admin", userController.admin);

module.exports = router;
