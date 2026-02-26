const mongoose = require("mongoose");

/**
 * Session Schema
 * Used to track user sessions across devices
 */
const sessionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userModel",
      required: true,
      index: true,
    },
    userModel: {
      type: String,
      enum: ["User", "Admin", "Manager", "Printer", "Rider"],
      default: "User",
    },
    deviceInfo: {
      type: String, // User agent string
    },
    ipAddress: {
      type: String,
    },
    browser: {
      type: String,
    },
    os: {
      type: String,
    },
    deviceType: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "unknown"],
      default: "unknown",
    },
    location: {
      type: String, // General location based on IP (city/country)
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    token: {
      type: String, // Hashed refresh token
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries and automatic expiration
sessionSchema.index({ userId: 1, isActive: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for automatic cleanup

module.exports = mongoose.model("Session", sessionSchema);
