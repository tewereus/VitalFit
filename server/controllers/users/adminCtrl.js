const Admin = require("../../models/users/userModel");
const User = require("../../models/users/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/jwtToken");
const validateMongoDbId = require("../../utils/validateMongoDbId");
const { generateRefreshToken } = require("../../config/refreshToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { createSession } = require("../utils/sessionCtrl");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await Admin.findOne({ email }).select("+loginAttempts");

  // Get client IP address for logging
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Check if the admin is locked out
  if (findAdmin && findAdmin.lockUntil && findAdmin.lockUntil > Date.now()) {
    return res.status(403).json({
      message: `Account is locked. Try again after ${Math.ceil(
        (findAdmin.lockUntil - Date.now()) / 60000,
      )} minutes.`,
    });
  }

  if (findAdmin) {
    if (await findAdmin.isPasswordMatched(password)) {
      // Reset login attempts and lock status on successful login
      findAdmin.loginAttempts = 0;
      findAdmin.lockUntil = null;

      // Update last login information
      findAdmin.lastLoginIp = clientIp;
      findAdmin.lastLoginAt = new Date();

      await findAdmin.save();

      // User type for this login
      const userType = "admin";

      // Generate tokens with user type
      const accessToken = generateToken(findAdmin?._id, userType);
      const refreshToken = generateRefreshToken(findAdmin?._id, userType);

      // Update refresh token in database
      await Admin.findByIdAndUpdate(
        findAdmin.id,
        { refreshToken: refreshToken },
        { new: true },
      );

      // Create a new session
      const session = await createSession({
        userId: findAdmin._id,
        userModel: "Admin",
        refreshToken: refreshToken,
        ipAddress: clientIp,
        userAgent: req.headers["user-agent"],
        expiresInDays: 3,
      });

      // Set type-specific refresh token as HTTP-only cookie
      res.cookie(`${userType}RefreshToken`, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 72 * 60 * 60 * 1000, // 72 hours (matching the JWT expiration)
      });

      // Set type-specific access token as HTTP-only cookie
      res.cookie(`${userType}AccessToken`, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours (matching the JWT expiration)
      });

      // Set type-specific session ID cookie (not HTTP-only so it can be accessed by client for session management)
      res.cookie(`${userType}SessionId`, session._id.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 72 * 60 * 60 * 1000, // 72 hours (matching the refresh token)
      });

      // Also set generic cookies for backward compatibility
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 72 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.cookie("sessionId", session._id.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 72 * 60 * 60 * 1000,
      });

      // Return admin data and also include token in response for backward compatibility
      return res.json({
        message: "logged in successfully",
        _id: findAdmin?._id,
        fullname: findAdmin?.fullname,
        username: findAdmin?.username,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        preference: findAdmin.preference,
        role: findAdmin?.role,
        image: findAdmin?.image,
        token: accessToken, // Include token in response for backward compatibility
        lastLogin: findAdmin.lastLoginAt,
      });
    } else {
      // Increment login attempts on failed login
      findAdmin.loginAttempts = (findAdmin.loginAttempts || 0) + 1;

      // Implement progressive lockout strategy
      if (findAdmin.loginAttempts >= 10) {
        if (findAdmin.loginAttempts % 10 === 0) {
          const lockTime = findAdmin.loginAttempts / 10;
          findAdmin.lockUntil = Date.now() + lockTime * 5 * 60 * 1000;

          // Log account lockout
          logAuthEvent({
            action: "account_locked",
            user: findAdmin,
            ipAddress: clientIp,
            userAgent: req.headers["user-agent"],
            status: "warning",
            details: {
              timestamp: new Date(),
              lockDuration: lockTime * 5 * 60 * 1000,
              loginAttempts: findAdmin.loginAttempts,
              reason: "Too many failed login attempts",
            },
          });
        }
      }

      await findAdmin.save();

      return res.status(401).json({
        message: "Incorrect email or password",
        loginAttempts: findAdmin.loginAttempts,
        remainingAttempts: 10 - (findAdmin.loginAttempts % 10),
      });
    }
  } else {
    return res.status(404).json({ message: "Admin not found" });
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const Session = require("../../models/utils/sessionModel");

  const userType = "admin";

  // Clear type-specific cookies
  res.clearCookie(`${userType}RefreshToken`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.clearCookie(`${userType}AccessToken`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.clearCookie(`${userType}SessionId`, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  // Also clear generic cookies for backward compatibility
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.clearCookie("sessionId", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  // If there's a refresh token, clear it from the admin record
  if (cookie?.refreshToken) {
    const refreshToken = cookie.refreshToken;
    const admin = await Admin.findOne({ refreshToken });

    if (admin) {
      // Clear the refresh token in the database
      admin.refreshToken = "";
      await admin.save();

      // Invalidate the session if it exists
      if (cookie?.sessionId) {
        await Session.findByIdAndUpdate(
          cookie.sessionId,
          { isActive: false },
          { new: true },
        );
      } else {
        // If no session ID in cookie, try to find by refresh token
        const hashedToken = crypto
          .createHash("sha256")
          .update(refreshToken)
          .digest("hex");

        await Session.updateOne(
          { token: hashedToken, isActive: true },
          { isActive: false },
        );
      }
    }
  }

  // Return success status
  return res.status(200).json({ message: "Logged out successfully" });
});

const viewAdminProfile = asyncHandler(async (req, res) => {
  const { id } = req.admin;
  try {
    const user = await Admin.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.admin;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  validateMongoDbId(id);

  // Validate required fields
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message:
        "Current password, new password, and confirm password are required",
    });
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  // Check if new password is different from current password
  if (currentPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: "New password must be different from current password",
    });
  }

  try {
    // Find admin and verify current password
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid =
      await admin.isPasswordMatched(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
      { new: true },
    ).select("-password -refreshToken");

    res.json({
      success: true,
      message: "Password updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating password",
      details: error.message,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      message: "user deleted successfully",
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "role",
      "search",
      "searchField",
      "isBlocked",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    // Search
    if (req.query.search) {
      const searchField = req.query.searchField; // Add this line to get the search field from the query parameters
      let searchQuery = {};

      // Determine which field to search based on the searchField parameter
      switch (searchField) {
        case "username":
          searchQuery = {
            username: { $regex: req.query.search.toString(), $options: "i" },
          };
          break;
        case "fullname":
          searchQuery = {
            fullname: { $regex: req.query.search.toString(), $options: "i" },
          };
          break;
        case "mobile":
          searchQuery = {
            mobile: { $regex: req.query.search.toString(), $options: "i" },
          };
          break;
        case "email":
          searchQuery = {
            email: { $regex: req.query.search.toString(), $options: "i" },
          };
          break;
        default:
          throw new Error("Invalid search field");
      }

      query = query.find(searchQuery);
    }
    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // display users || admin
    if (req.query.role) {
      if (req.query.role === "All") {
        query = query.find();
      } else {
        query = query.find({ role: req.query.role });
      }
    }

    // console.log(req.query)

    // display blocked/unblocked users
    if (typeof req.query.isBlocked !== "undefined") {
      const isBlockedParam = req.query.isBlocked;
      if (isBlockedParam === "All") {
        // no additional filter
      } else if (isBlockedParam === "true" || isBlockedParam === "false") {
        const isBlockedValue = isBlockedParam === "true";
        query = query.find({ isBlocked: isBlockedValue });
      }
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const usersCount = await User.countDocuments();
      if (skip >= usersCount) throw new Error("This Page does not exists");
    }
    // const usersCount = await User.countDocuments(JSON.parse(queryStr));
    // Get the total number of users
    const totalUsers = await User.countDocuments({
      // error here that says $regex must be a string
      // $or: [
      //   { username: { $regex: req.query.search, $options: "i" } },
      //   { fullname: { $regex: req.query.search, $options: "i" } },
      //   { email: { $regex: req.query.search, $options: "i" } },
      // ],
    });
    const users = await query;
    res.json({ users, totalUsers });
  } catch (error) {
    throw new Error(error);
  }
});

const checkAdminPass = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if admin exists or not
  const findAdmin = await Admin.findOne({ email });
  if (findAdmin.role !== "administrator") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      role: findAdmin?.role,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const addStaff = asyncHandler(async (req, res) => {
  // const {id} = req.user
  const { email } = req.body;
  console.log(req.body);
  try {
    const staff = await User.findOne({ email });
    if (staff) throw new Error("Staff with this email already exists");
    const newStaff = await User.create(req.body); // check if it can be added with await staff.save()
    await newStaff.save();
    res.json(newStaff);
  } catch (error) {
    throw new Error(error);
  }
});

const changeMainStatus = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { main_status } = req.body;
  const { id } = req.params;
  try {
    const isAdmin = await Admin.findById(_id);
    if (!isAdmin) throw new Error("Not Authorized");
    const newManager = await Manager.findByIdAndUpdate(
      id,
      {
        main_status: main_status,
      },
      {
        new: true,
      },
    );
    res.json(newManager);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllManagers = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "searchField",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Manager.find(JSON.parse(queryStr))
      .populate("address.country", "country_name")
      .populate("address.region", "region_name")
      .populate("address.subRegion", "subregion_name")
      .populate("workArea", "subregion_name");

    // Search
    if (req.query.search) {
      const searchField = req.query.searchField; // Add this line to get the search field from the query parameters
      let searchQuery = {};

      // Determine which field to search based on the searchField parameter
      switch (searchField) {
        case "username":
          searchQuery = {
            username: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "fullname":
          searchQuery = {
            fullname: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "mobile":
          searchQuery = { mobile: { $regex: req.query.search, $options: "i" } };
          break;
        case "email":
          searchQuery = { email: { $regex: req.query.search, $options: "i" } };
          break;
        default:
          throw new Error("Invalid search field");
      }

      query = query.find(searchQuery);
    }

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const usersCount = await Manager.countDocuments();
      if (skip >= usersCount) throw new Error("This Page does not exists");
    }
    // const usersCount = await User.countDocuments(JSON.parse(queryStr));
    // Get the total number of users
    const totalUsers = await Manager.countDocuments();
    const users = await query;
    res.json({ users, totalUsers });
  } catch (error) {
    throw new Error(error);
  }
});

const getManagerInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteManager = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const manager = await Manager.findByIdAndDelete(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json({ message: "Manager deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

const updateManager = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const manager = await Manager.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json({ message: "Manager updated successfully", manager });
  } catch (error) {
    throw new Error(error);
  }
});

const toggleDarkMode = asyncHandler(async (req, res) => {
  const { id } = req.admin;
  const { mode } = req.body.preference;
  try {
    const darkmode = await Admin.findByIdAndUpdate(
      id,
      { "preference.mode": mode },
      {
        returnDocument: "after",
        runValidators: true, // Optional: Ensure that validators are run
      },
    ).select("preference.mode -_id");
    console.log(darkmode);
    res.json(darkmode);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * @desc    Refresh access token using refresh token
 * @route   POST /api/v1/admin/refresh-token
 * @access  Public
 */
const handleRefreshToken = asyncHandler(async (req, res) => {
  // Get refresh token from cookies
  const cookies = req.cookies;
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const Session = require("../../models/utils/sessionModel");
  const {
    updateSessionActivity,
    findSessionByToken,
  } = require("../utils/sessionCtrl");

  // Try to get the appropriate refresh token
  let refreshToken;

  // First check for admin-specific refresh token
  if (cookies?.adminRefreshToken) {
    // Use admin-specific refresh token if available
    refreshToken = cookies.adminRefreshToken;
  }
  // Then check for generic refresh token
  else if (cookies?.refreshToken) {
    // Fall back to generic refresh token
    refreshToken = cookies.refreshToken;
  } else {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET ||
        "056d5e46c64d02bca6313aed117e88d4617a2cf3f9174f1406bb42058266a417",
    );

    // Find the admin with this ID
    const admin = await Admin.findOne({
      _id: decoded.id,
    });

    if (!admin) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Try to find the session associated with this token
    let session;
    try {
      session = await findSessionByToken(refreshToken);
    } catch (sessionError) {
      console.error("Error finding session:", sessionError);
    }

    // If no session found, create a new one
    if (!session) {
      console.log("No active session found, creating a new one");
      // We'll create a new session below when generating new tokens
    }

    // Generate new tokens
    const newAccessToken = generateToken(admin._id);
    const newRefreshToken = generateRefreshToken(admin._id);

    // Update refresh token in database
    admin.refreshToken = newRefreshToken;
    await admin.save();

    // Hash the new refresh token
    const hashedToken = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    // If we have a session, update it; otherwise create a new one
    if (session) {
      await Session.findByIdAndUpdate(
        session._id,
        {
          token: hashedToken,
          lastActivity: new Date(),
        },
        { new: true },
      );
    } else {
      // Create a new session
      session = await createSession({
        userId: admin._id,
        userModel: "Admin",
        refreshToken: newRefreshToken,
        ipAddress: clientIp,
        userAgent: req.headers["user-agent"],
        expiresInDays: 3,
      });
    }

    // User type for this refresh
    const userType = "admin";

    // Set type-specific refresh token as HTTP-only cookie
    res.cookie(`${userType}RefreshToken`, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 72 * 60 * 60 * 1000, // 72 hours (matching the JWT expiration)
    });

    // Set type-specific access token as HTTP-only cookie
    res.cookie(`${userType}AccessToken`, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (matching the JWT expiration)
    });

    // Set type-specific session ID cookie (not HTTP-only so it can be accessed by client for session management)
    res.cookie(`${userType}SessionId`, session._id.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 72 * 60 * 60 * 1000, // 72 hours (matching the refresh token)
    });

    // Also set generic cookies for backward compatibility
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 72 * 60 * 60 * 1000,
    });

    // Set the new access token as a cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (matching the JWT expiration)
    });

    // Set session ID cookie (not HTTP-only so it can be accessed by client for session management)
    res.cookie("sessionId", session._id.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 72 * 60 * 60 * 1000, // 72 hours (matching the refresh token)
    });

    // Return the new access token and basic user info
    return res.json({
      accessToken: newAccessToken,
      message: "Token refreshed successfully",
      user: {
        _id: admin._id,
        fullname: admin.fullname,
        username: admin.username,
        email: admin.email,
        mobile: admin.mobile,
        preference: admin.preference,
        image: admin.image,
        lastLogin: admin.lastLoginAt,
      },
    });
  } catch (error) {
    // If token verification fails
    const userType = "admin";

    // Clear type-specific cookies
    res.clearCookie(`${userType}RefreshToken`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.clearCookie(`${userType}AccessToken`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.clearCookie(`${userType}SessionId`, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    // Also clear generic cookies for backward compatibility
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.clearCookie("sessionId", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
});

/**
 * @desc    Get all active sessions for the current admin
 * @route   GET /api/v1/admin/sessions
 * @access  Private (Admin only)
 */
const getSessions = asyncHandler(async (req, res) => {
  const { id } = req.admin;
  const Session = require("../../models/utils/sessionModel");
  const currentSessionId = req.cookies?.sessionId;

  const sessions = await Session.find({
    userId: id,
    userModel: "Admin",
    isActive: true,
  }).sort({ lastActivity: -1 });

  // Mark the current session
  const sessionsWithCurrentFlag = sessions.map((session) => ({
    ...session.toObject(),
    isCurrent: session._id.toString() === currentSessionId,
  }));

  res.json(sessionsWithCurrentFlag);
});

/**
 * @desc    Terminate a specific session
 * @route   POST /api/v1/admin/sessions/:id/terminate
 * @access  Private (Admin only)
 */
const terminateSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const adminId = req.admin.id;
  const Session = require("../../models/utils/sessionModel");
  const currentSessionId = req.cookies?.sessionId;

  // Prevent terminating the current session
  if (id === currentSessionId) {
    return res.status(400).json({
      message: "Cannot terminate current session. Use logout instead.",
    });
  }

  // Find and update the session
  const session = await Session.findOneAndUpdate(
    { _id: id, userId: adminId, userModel: "Admin" },
    { isActive: false },
    { new: true },
  );

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.json({ message: "Session terminated successfully" });
});

/**
 * @desc    Terminate all sessions except the current one
 * @route   POST /api/v1/admin/sessions/terminate-all-other
 * @access  Private (Admin only)
 */
const terminateAllOtherSessions = asyncHandler(async (req, res) => {
  const adminId = req.admin.id;
  const Session = require("../../models/utils/sessionModel");
  const currentSessionId = req.cookies?.sessionId;

  // Update all sessions except the current one
  const result = await Session.updateMany(
    {
      userId: adminId,
      userModel: "Admin",
      _id: { $ne: currentSessionId },
      isActive: true,
    },
    { isActive: false },
  );

  res.json({
    message: "All other sessions terminated successfully",
    terminatedCount: result.modifiedCount,
  });
});

/**
 * @desc    Logout from all devices (terminate all sessions)
 * @route   POST /api/v1/admin/sessions/logout-all
 * @access  Private (Admin only)
 */
const logoutFromAllDevices = asyncHandler(async (req, res) => {
  const adminId = req.admin.id;
  const Session = require("../../models/utils/sessionModel");

  // Update all sessions for this admin
  const result = await Session.updateMany(
    { userId: adminId, userModel: "Admin", isActive: true },
    { isActive: false },
  );

  // Clear the admin's refresh token
  await Admin.findByIdAndUpdate(adminId, { refreshToken: "" });

  // Clear cookies
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.clearCookie("sessionId", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.json({
    message: "Logged out from all devices successfully",
    terminatedCount: result.modifiedCount,
  });
});

module.exports = {
  // registerUser,
  loginAdmin,
  logout,
  viewAdminProfile,
  //   updateUser,
  updatePassword,
  deleteUser,
  getAllUsers,
  checkAdminPass,
  addStaff,
  changeMainStatus,
  getAllManagers,
  getManagerInfo,
  deleteManager,
  updateManager,
  toggleDarkMode,
  handleRefreshToken,
  getSessions,
  terminateSession,
  terminateAllOtherSessions,
  logoutFromAllDevices,
};
