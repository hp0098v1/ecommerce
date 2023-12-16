// controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const User = require("../models/User");
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

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    const sanitizedUser = _.omit(user.toObject(), ["password"]);
    res.status(201).json({
      user: sanitizedUser,
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

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    const sanitizedUser = _.omit(user.toObject(), ["password"]);
    res.status(200).json({
      user: sanitizedUser,
    });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
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
    res.cookie("accessToken", newAccessToken, { httpOnly: true });
    res.send("New access token generated successfully.");
  });
};

const getMe = async (req, res) => {
  try {
    const userId = req.params.userId;

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
    if (email) user.email = email;

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

    // Save the updated user
    const updatedUser = await user.save();

    const sanitizedUser = _.omit(updatedUser.toObject(), ["password"]);
    res.status(200).json({ user: sanitizedUser });
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

const admin = async (req, res) => {
  try {
    res.status(200).send("Hi Admin!");
  } catch (error) {
    errorHandler(res, 400, error?.message);
  }
};

module.exports = { register, login, refresh, getMe, updateUser, admin, logout };
