const jwt = require("jsonwebtoken");

const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");

const defaultConfig = {
  max: 1000,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  skipFailedRequests: false,
  skipSuccessfulRequests: false,
};

const basicRateLimiter = (options = {}) => {
  const config = { ...defaultConfig, ...options };
  return rateLimit(config);
};

const keyGenerator = (req) => {
  if (req.user) {
    return req.user.id;
  }

  return ipKeyGenerator(req);
};

const skip = (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ensure only admin users skip rate limiting
      if (decoded.role && decoded.role === "administrator") {
        return true; // Skip rate limiting
      }
    } catch (error) {
      console.log("Invalid token, rate limit applies:", error.message);
    }
  }

  return false; // Apply rate limiting if authentication fails or user is not admin
};

// 5. Handler Function (Custom Error Response)
const handler = (req, res, next, options) => {
  res.status(options.statusCode || 429).json({
    success: false,
    message: options.message || "Too many requests, please try again later.",
  });
};

module.exports = {
  basicRateLimiter,
  keyGenerator,
  skip,
  handler,
};
