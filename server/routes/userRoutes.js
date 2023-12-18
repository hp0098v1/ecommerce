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

router.get("/cart", userController.getCart);
router.post("/cart", userController.createCart);
router.put("/cart/:cartId", userController.updateCart);
router.delete("/cart/:cartId", userController.deleteCart);

router.get("/orders", userController.getOrders);
router.get("/orders/:orderId", userController.getOrder);
router.post("/orders", userController.createOrder);
router.put("/orders/:orderId", userController.updateOrder);

// Admin routes
router.use(authorizeAdmin);
router.get("/admin/cart", userController.adminGetCarts);
router.get("/admin/cart/:userId", userController.adminGetUserCart);

router.get("/admin/orders", userController.adminGetOrders);
router.get("/admin/orders/:userId", userController.adminGetUserOrders);
router.put("/admin/orders/:orderId", userController.adminUpdateOrder);
router.get("/admin", userController.admin);

module.exports = router;
