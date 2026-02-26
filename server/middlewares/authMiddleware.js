const User = require("../models/users/userModel");
const Admin = require("../models/users/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET environment variable is not set. Please configure it before starting the server.",
    );
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

const getTokenFromRequest = (req, userType = "") => {
  const cookieName = userType ? `${userType}AccessToken` : "accessToken";

  if (req.cookies?.[cookieName]) {
    return req.cookies[cookieName];
  }

  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

const handleTokenRefresh = (res, userType = "") => {
  const refreshCookieName = userType
    ? `${userType}RefreshToken`
    : "refreshToken";

  if (res.req?.cookies?.[refreshCookieName]) {
    return res.status(401).json({
      message: "Access token expired or missing",
      tokenExpired: true,
      userType: userType || undefined,
    });
  }

  if (res.req?.cookies?.refreshToken) {
    return res.status(401).json({
      message: "Access token expired or missing",
      tokenExpired: true,
    });
  }

  throw new Error("Authentication required. Please log in.");
};

const updateSessionActivity = async (req, userType = "") => {
  const sessionCookieName = userType ? `${userType}SessionId` : "sessionId";

  if (req.cookies?.[sessionCookieName]) {
    try {
      const Session = require("../models/utils/sessionModel");
      await Session.findByIdAndUpdate(
        req.cookies[sessionCookieName],
        { lastActivity: new Date() },
        { new: true },
      );
      return;
    } catch (sessionError) {
      console.error(
        `Error updating ${userType} session activity:`,
        sessionError,
      );
    }
  }

  if (req.cookies?.sessionId) {
    try {
      const Session = require("../models/utils/sessionModel");
      await Session.findByIdAndUpdate(
        req.cookies.sessionId,
        { lastActivity: new Date() },
        { new: true },
      );
    } catch (sessionError) {
      console.error("Error updating generic session activity:", sessionError);
    }
  }
};

const authMiddleware = asyncHandler(async (req, res, next) => {
  const appType = req.headers["x-app-type"] || "";

  const userType = "user";
  const token = getTokenFromRequest(req, userType);
  if (!token) {
    return handleTokenRefresh(res, userType);
  }

  try {
    const decoded = verifyToken(token);

    if (
      decoded.userType &&
      decoded.userType !== userType &&
      decoded.userType !== ""
    ) {
      console.warn(
        `Token userType mismatch: expected ${userType}, got ${decoded.userType}`,
      );
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new Error("User not found with the provided token");
    }

    await updateSessionActivity(req, userType);
    req.user = user;
    req.user.role = "user";
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return handleTokenRefresh(res, userType);
    }
    throw new Error("Invalid or expired token. Please log in again.");
  }
});

const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
  const appType = req.headers["x-app-type"] || "";

  const userType = "admin";
  const token = getTokenFromRequest(req, userType);
  if (!token) {
    return handleTokenRefresh(res, userType);
  }

  try {
    const decoded = verifyToken(token);

    if (
      decoded.userType &&
      decoded.userType !== userType &&
      decoded.userType !== ""
    ) {
      console.warn(
        `Token userType mismatch: expected ${userType}, got ${decoded.userType}`,
      );
    }

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      throw new Error("Admin not found with the provided token");
    }

    await updateSessionActivity(req, userType);
    req.admin = admin;
    req.admin.role = "administrator";

    req.user = admin;
    req.user.role = "administrator";

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return handleTokenRefresh(res, userType);
    }
    throw new Error("Invalid or expired token. Please log in again.");
  }
});

module.exports = {
  authMiddleware,
  adminAuthMiddleware,
};
