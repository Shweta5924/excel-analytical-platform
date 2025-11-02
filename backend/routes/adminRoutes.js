const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);



// const express = require("express");
// const router = express.Router();
const User = require("../models/User");
const File = require("../models/File");
const { authMiddleware } = require("../middleware/authMiddleware");

// Get all users
router.get("/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  const users = await User.find().select("-password");
  res.json(users);
});

// Get all files
router.get("/files", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  const files = await File.find().sort({ uploadedAt: -1 }).populate("uploadedBy", "name email");
  res.json(files);
});

router.delete("/users/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;