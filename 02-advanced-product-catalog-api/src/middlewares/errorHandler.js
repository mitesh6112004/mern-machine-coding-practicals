export const errorHandler = (err, req, res, next) => {
  // Duplicate product (same name + brand)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Product with this name and brand already exists",
    });
  }

  // Mongoose validation error (e.g., negative price, invalid category)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};