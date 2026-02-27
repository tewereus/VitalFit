const express = require("express");
const router = express.Router();
const {
  // registerUser,
  loginAdmin,
  logout,
  viewAdminProfile,
  updatePassword,
  deleteUser,
  getAllUsers,
  checkAdminPass,
  addStaff,
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  changeMainStatus,
  getAllManagers,
  toggleDarkMode,
  getManagerInfo,
  updateManager,
  handleRefreshToken,
  getSessions,
  terminateSession,
  terminateAllOtherSessions,
  logoutFromAllDevices,
} = require("../../controllers/users/adminCtrl");

const { adminAuthMiddleware } = require("../../middlewares/authMiddleware");

// router.post("/registerAdmin", registerUser);
router.post("/login", loginAdmin);
router.post("/logout", logout);
router.post("/refresh-token", handleRefreshToken);
router.get("/profile", adminAuthMiddleware, viewAdminProfile);
router.get("/sessions", adminAuthMiddleware, getSessions);
router.post("/sessions/:id/terminate", adminAuthMiddleware, terminateSession);
router.post(
  "/sessions/terminate-all-other",
  adminAuthMiddleware,
  terminateAllOtherSessions,
);
router.post("/sessions/logout-all", adminAuthMiddleware, logoutFromAllDevices);
router.put("/update-password", adminAuthMiddleware, updatePassword);
router.get("/all-users", adminAuthMiddleware, getAllUsers);
router.post("/check-admin", adminAuthMiddleware, checkAdminPass);
router.post("/add-staff", adminAuthMiddleware, addStaff);
router.get("/members", adminAuthMiddleware, getMembers);
router.post("/members", adminAuthMiddleware, addMember);
router.put("/members/:id", adminAuthMiddleware, updateMember);
router.delete("/members/:id", adminAuthMiddleware, deleteMember);
router.put("/get-staff/:id/update", adminAuthMiddleware, updateManager);
router.post("/staff-status/:id", adminAuthMiddleware, changeMainStatus);
router.get("/all-staffs", adminAuthMiddleware, getAllManagers);
router.get("/get-staff/:id", adminAuthMiddleware, getManagerInfo);
router.put("/dark-mode", adminAuthMiddleware, toggleDarkMode);

module.exports = router;
