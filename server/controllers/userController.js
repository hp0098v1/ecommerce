// controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/authMiddleware");
const { errorHandler } = require("../lib/utils/errorHandler");
const {
  registerValidation,
  loginValidation,
  updateUserValidation,
} = require("../lib/validations/userValidations");
const deleteFileMiddleware = require("../middlewares/deleteFileMiddleware");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error } = registerValidation.validate(req.body);

    if (error) return errorHandler(res, 400, error.message);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return errorHandler(res, 400, "User already exist with same email!");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    req.user = _.omit(user.toObject(), ["password"]);

    const sanitizedUser = _.omit(user.toObject(), ["password"]);
    res.status(201).json({
      user: sanitizedUser,
      accessToken,
    });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // req.body validation
    const { error } = loginValidation.validate(req.body);
    if (error) return errorHandler(res, 400, error.message);

    // if user does not exist throw error
    const user = await User.findOne({ email }).exec();
    if (!user) return errorHandler(res, 400, "User not found!");

    // password comparision
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) return errorHandler(res, 400, "Invalid Credentials");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    req.user = _.omit(user.toObject(), ["password"]);

    const sanitizedUser = _.omit(user.toObject(), ["password"]);
    res.status(200).json({
      user: sanitizedUser,
      accessToken,
    });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    errorHandler(res, 400, error);
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send("No refresh token provided.");
  }

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid refresh token.");
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};

const getMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return errorHandler(res, 400, "User not found!");

    const sanitizedUser = _.omit(user.toObject(), ["password"]);
    res.status(200).json({ user: sanitizedUser });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password, currentPassword } = req.body;
    const imageUrl = req.file.path;

    const { error } = updateUserValidation.validate(req.body);
    if (error) return errorHandler(res, 400, error.message);

    // Check if the user making the request is the owner of the profile
    if (userId !== req.user._id) {
      return res.status(403).json({
        error: "Unauthorized: You cannot update another user's profile",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields conditionally
    if (username) user.username = username;
    // if (email) user.email = email;

    // If updating the password, verify the current password and set the new one
    if (password) {
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      console.log(isPasswordMatch);

      if (!isPasswordMatch) {
        return errorHandler(res, 400, "Invalid current password!");
      }

      user.password = await bcrypt.hash(password, 10);
    }

    if (imageUrl) {
      if (user.profile) deleteFileMiddleware(user.profile);

      user.profile = imageUrl;
    }

    // Save the updated user
    const updatedUser = await user.save();

    const sanitizedUser = _.omit(updatedUser.toObject(), ["password"]);
    res.status(200).json({ user: sanitizedUser });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

/* -------------------------------------------------------------------------- */
/*                                    Cart                                    */
/* -------------------------------------------------------------------------- */
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).exec();

    if (!cart) return errorHandler(res, 404, "Cart not found!");

    if (cart.userId.toString() !== userId.toString())
      return errorHandler(res, 400, "Unauthorized!");

    res.status(200).json({ cart });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const createCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, grandTotal } = req.body;

    const cart = await Cart.findOne({ userId }).exec();
    if (cart) return errorHandler(res, 400, "Cart already exists!");

    const newCart = new Cart({
      userId,
      products,
      grandTotal,
    });

    if (!newCart) return errorHandler(res, 400, "Cart not created!");
    await newCart.save();

    res.status(201).json({ cart: newCart });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = req.params.cartId;
    const { products, grandTotal } = req.body;

    const oldCart = await Cart.findById(cartId).exec();
    if (!oldCart) return errorHandler(res, 400, "Cart not found!");

    if (oldCart.userId.toString() !== userId.toString())
      return errorHandler(res, 400, "Unauthorized!");

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        products,
        grandTotal,
      },
      { new: true }
    );

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = req.params.cartId;

    const cart = await Cart.findById(cartId).exec();

    if (!cart) return errorHandler(res, 400, "Cart not found!");

    if (cart.userId.toString() !== userId.toString())
      return errorHandler(res, 400, "Unauthorized!");

    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ message: "Cart deleted successfully!" });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

/* -------------------------------------------------------------------------- */
/*                                    Order                                   */
/* -------------------------------------------------------------------------- */
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).exec();

    if (!orders) return errorHandler(res, 400, "Orders not found!");

    if (orders.userId.toString() !== userId.toString())
      return errorHandler(res, 400, "Unauthorized!");

    res.status(200).json({ orders });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).exec();

    if (!order) return errorHandler(res, 400, "Orders not found!");

    if (order.userId.toString() !== userId.toString())
      return errorHandler(res, 400, "Unauthorized!");

    res.status(200).json({ order });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, grandTotal, address, status } = req.body;

    const newOrder = new Order({
      userId,
      products,
      grandTotal,
      address,
      status,
    });

    await newOrder.save();

    res.status(201).json({ order: newOrder });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    if (!status) return errorHandler(res, 400, "Status is required!");

    const oldOrder = await Order.findById(orderId);

    if (!oldOrder) return errorHandler(res, 400, "Order not found!");

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

/* -------------------------------------------------------------------------- */
/*                                    ADMIN                                   */
/* -------------------------------------------------------------------------- */
const admin = async (req, res) => {
  try {
    res.status(200).send("Hi Admin!");
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const adminGetCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    if (!carts) return errorHandler(res, 400, "Carts not found!");

    res.status(200).json({ carts });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const adminGetUserCart = async (req, res) => {
  // create a route /users/admin/cart/:userId
  // and get the cart belong to User
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).exec();

    if (cart) return errorHandler(res, 400, "Cart not found!");

    return res.status(200).json({ userId, cart });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const adminGetOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders) return errorHandler(res, 400, "Orders not found!");

    res.status(200).json({ orders });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const adminGetUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).exec();

    if (!orders) return errorHandler(res, 400, "Orders not found!");

    res.status(200).json({ userId, orders });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const adminUpdateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    if (!status) return errorHandler(res, 400, "Status is required!");

    const oldOrder = await Order.findById(orderId);

    if (!oldOrder) return errorHandler(res, 400, "Order not found!");

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

module.exports = {
  register,
  login,
  refresh,
  getMe,
  updateUser,
  admin,
  logout,
  getCart,
  createCart,
  updateCart,
  deleteCart,
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  adminGetCarts,
  adminGetUserCart,
  adminGetOrders,
  adminGetUserOrders,
  adminUpdateOrder,
};
