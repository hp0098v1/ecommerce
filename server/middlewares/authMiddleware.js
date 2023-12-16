// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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
    process.env.SECRET_KEY
  );
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).send("Access denied.");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");

    req.user = _.omit(user, ["password"]);
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).send("Permission denied.");
  next();
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  generateAccessToken,
  generateRefreshToken,
};
