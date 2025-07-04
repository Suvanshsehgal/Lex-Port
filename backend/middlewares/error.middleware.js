const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_SERVER_ERROR",
  });
};

export default errorMiddleware;