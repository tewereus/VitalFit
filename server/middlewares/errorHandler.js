// Not Found Handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handler
const errorHandler = (err, req, res, next) => {
  // Fix the status code logic (the original had a bug)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Create response body
  const isProduction = process.env.NODE_ENV === "production";
  const responseBody = {
    message:
      isProduction && statusCode >= 500
        ? "Internal server error"
        : err?.message,
    stack: isProduction ? null : err?.stack,
  };

  res.json(responseBody);
};

module.exports = { errorHandler, notFound };
