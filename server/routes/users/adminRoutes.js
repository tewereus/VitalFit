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
  addManager,
  changeMainStatus,
  getAllManagers,
  toggleDarkMode,
  getManagerInfo,
  deleteManager,
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
router.post("/add-manager", adminAuthMiddleware, addManager);
router.put("/get-manager/:id/update", adminAuthMiddleware, updateManager);
router.delete("/get-manager/:id/delete", adminAuthMiddleware, deleteManager);
router.post("/manager-status/:id", adminAuthMiddleware, changeMainStatus);
router.get("/all-managers", adminAuthMiddleware, getAllManagers);
router.get("/get-manager/:id", adminAuthMiddleware, getManagerInfo);
router.put("/dark-mode", adminAuthMiddleware, toggleDarkMode);

module.exports = router;
