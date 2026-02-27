const Session = require("../../models/utils/sessionModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

// Try to load UA-Parser-js with error handling
let UAParser;
try {
  UAParser = require("ua-parser-js");
} catch (error) {
  console.warn(
    "Warning: ua-parser-js module not found. Device detection will be limited.",
  );
  // Create a simple fallback parser
  UAParser = class FallbackUAParser {
    constructor() {
      this.ua = "";
    }
    getBrowser() {
      return { name: "Unknown", version: "" };
    }
    getOS() {
      return { name: "Unknown", version: "" };
    }
    getDevice() {
      return { type: "unknown" };
    }
  };
}

/**
 * Create a new session
 * @param {Object} options - Session options
 * @param {string} options.userId - User ID
 * @param {string} options.userModel - User model type
 * @param {string} options.refreshToken - Refresh token
 * @param {string} options.ipAddress - IP address
 * @param {string} options.userAgent - User agent string
 * @param {number} options.expiresInDays - Session expiration in days
 * @returns {Promise<Object>} Created session
 */
const createSession = async (options) => {
  try {
    const {
      userId,
      userModel = "User",
      refreshToken,
      ipAddress,
      userAgent,
      expiresInDays = 3,
    } = options;

    let browser = "Unknown";
    let os = "Unknown";
    let deviceType = "unknown";

    // Parse user agent with error handling
    try {
      const parser = new UAParser(userAgent);
      browser = `${parser.getBrowser().name || "Unknown"} ${
        parser.getBrowser().version || ""
      }`.trim();
      os = `${parser.getOS().name || "Unknown"} ${
        parser.getOS().version || ""
      }`.trim();
      deviceType = parser.getDevice().type || "unknown";
    } catch (parserError) {
      console.warn("Error parsing user agent:", parserError.message);
      // Continue with default values
    }

    // Hash the refresh token for storage
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    // Create new session
    const session = new Session({
      userId,
      userModel,
      deviceInfo: userAgent,
      ipAddress,
      browser,
      os,
      deviceType,
      lastActivity: new Date(),
      expiresAt,
      token: hashedToken,
    });

    await session.save();
    return session;
  } catch (error) {
    console.error("Error creating session:", error);
    // Create a minimal session to avoid breaking the authentication flow
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (options?.expiresInDays || 3));

      const hashedToken = crypto
        .createHash("sha256")
        .update(options?.refreshToken || "fallback-token")
        .digest("hex");

      const fallbackSession = new Session({
        userId: options?.userId,
        userModel: options?.userModel || "User",
        deviceInfo: "Unknown",
        ipAddress: options?.ipAddress || "Unknown",
        browser: "Unknown",
        os: "Unknown",
        deviceType: "unknown",
        lastActivity: new Date(),
        expiresAt,
        token: hashedToken,
      });

      await fallbackSession.save();
      return fallbackSession;
    } catch (fallbackError) {
      console.error("Critical error creating fallback session:", fallbackError);
      throw new Error("Failed to create session");
    }
  }
};

/**
 * Get active sessions for a user
 * @param {string} userId - User ID
 * @param {string} userModel - User model type
 * @returns {Promise<Array>} List of active sessions
 */
const getActiveSessions = async (userId, userModel = "User") => {
  return await Session.find({
    userId,
    userModel,
    isActive: true,
  }).sort({ lastActivity: -1 });
};

/**
 * Invalidate a specific session
 * @param {string} sessionId - Session ID
 * @param {string} userId - User ID (for verification)
 * @returns {Promise<boolean>} Success status
 */
const invalidateSession = async (sessionId, userId) => {
  const session = await Session.findOne({
    _id: sessionId,
    userId,
  });

  if (!session) {
    return false;
  }

  session.isActive = false;
  await session.save();
  return true;
};

/**
 * Invalidate all sessions for a user except the current one
 * @param {string} userId - User ID
 * @param {string} currentSessionId - Current session ID to keep
 * @returns {Promise<number>} Number of invalidated sessions
 */
const invalidateAllOtherSessions = async (userId, currentSessionId) => {
  const result = await Session.updateMany(
    {
      userId,
      _id: { $ne: currentSessionId },
      isActive: true,
    },
    {
      isActive: false,
    },
  );

  return result.modifiedCount;
};

/**
 * Find session by refresh token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} Session object
 */
const findSessionByToken = async (refreshToken) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  return await Session.findOne({
    token: hashedToken,
    isActive: true,
  });
};

/**
 * Update session activity
 * @param {string} sessionId - Session ID
 * @returns {Promise<void>}
 */
const updateSessionActivity = async (sessionId) => {
  await Session.findByIdAndUpdate(sessionId, {
    lastActivity: new Date(),
  });
};

// Controller for getting user sessions
const getUserSessions = asyncHandler(async (req, res) => {
  const { id } = req.user;

  // Determine user model based on role
  let userModel;
  if (req.user.role === "administrator") {
    userModel = "Admin";
  } else if (req.user.role === "staff") {
    userModel = "Staff";
  } else if (req.user.role === "member") {
    userModel = "Member";
  } else {
    userModel = "User";
  }

  try {
    const sessions = await getActiveSessions(id, userModel);

    // Map sessions to a more user-friendly format
    const formattedSessions = sessions.map((session) => ({
      id: session._id,
      device: session.deviceType,
      browser: session.browser,
      os: session.os,
      ipAddress: session.ipAddress,
      lastActivity: session.lastActivity,
      createdAt: session.createdAt,
    }));

    res.json(formattedSessions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sessions", error: error.message });
  }
});

// Controller for revoking a session
const revokeSession = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { sessionId } = req.params;

  // Determine user model based on role
  let userModel;
  if (req.user.role === "administrator") {
    userModel = "Admin";
  } else if (req.user.role === "staff") {
    userModel = "Staff";
  } else if (req.user.role === "member") {
    userModel = "Member";
  } else {
    userModel = "User";
  }
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const success = await invalidateSession(sessionId, id);

    if (success) {
      res.json({ message: "Session revoked successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Session not found or already inactive" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error revoking session", error: error.message });
  }
});

// Controller for revoking all other sessions
const revokeAllOtherSessions = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { currentSessionId } = req.body;
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const count = await invalidateAllOtherSessions(id, currentSessionId);

    res.json({ message: `${count} sessions revoked successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error revoking sessions", error: error.message });
  }
});

module.exports = {
  createSession,
  getActiveSessions,
  invalidateSession,
  invalidateAllOtherSessions,
  findSessionByToken,
  updateSessionActivity,
  getUserSessions,
  revokeSession,
  revokeAllOtherSessions,
};
