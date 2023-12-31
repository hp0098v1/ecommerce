// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { errorHandler } = require("../lib/utils/errorHandler");

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return errorHandler(res, 401, "Access Denied.");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return errorHandler(res, 403, "Invalid Token.");

    req.user = _.omit(user, ["password"]);
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return errorHandler(res, 403, "Unauthorized.");
  next();
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  generateAccessToken,
  generateRefreshToken,
};
