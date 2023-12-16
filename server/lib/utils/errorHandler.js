const errorHandler = (res, status, message) => {
  return res.status(status).json({ status, message });
};

module.exports = { errorHandler };
