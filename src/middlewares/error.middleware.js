// src/middlewares/error.middleware.js
module.exports = (err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
