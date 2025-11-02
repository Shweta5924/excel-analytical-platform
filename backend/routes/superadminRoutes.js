const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { superadminOnly } = require("../middleware/superadminOnly");
const User = require("../models/User");
const Admin = require("../models/Admin");
const {
  getStats,
  registerAdmin,
  getUsers,
  getFiles,
} = require("../controllers/superadminController");
const { loginSuperadmin } = require("../controllers/authController");

router.post("/superadmin-login", loginSuperadmin);
router.get("/stats", authMiddleware, superadminOnly, getStats);
router.get("/users", authMiddleware, superadminOnly, getUsers);
router.get("/files", authMiddleware, superadminOnly, getFiles);
router.post("/register-admin", authMiddleware, superadminOnly, registerAdmin);


// router.get("/admins", authMiddleware, superadminOnly, async (req, res) => {
//   const admins = await Admin.find().select("-password");
//   res.json(admins);
// });
router.get("/admins", authMiddleware, superadminOnly, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
});

router.delete("/admins/:id", authMiddleware, superadminOnly, async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ message: "Admin deleted" });
});

router.delete("/users/:id", authMiddleware, superadminOnly, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});
module.exports = router;
