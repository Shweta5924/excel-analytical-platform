const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const File = require("../models/File");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  uploadFile,
  getFiles,
  parseFile
} = require("../controllers/fileController");

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/", authMiddleware, getFiles);
router.get("/:id/parse", authMiddleware, parseFile);

router.get("/:id/analyze", authMiddleware, async (req, res) => {
  try {
    const mockData = [
      { label: "Category A", value: 400 },
      { label: "Category B", value: 300 },
      { label: "Category C", value: 200 },
      { label: "Category D", value: 100 },
    ];
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ message: "Error analyzing file", error });
  }
});

router.get("/download/:id", authMiddleware, async (req, res) => {
  try {
    const fileRecord = await File.findById(req.params.id);
    if (!fileRecord) return res.status(404).send("File not found");

    if (!fs.existsSync(fileRecord.filepath)) {
      return res.status(404).send("File not found on disk");
    }

    res.download(fileRecord.filepath, fileRecord.originalName || fileRecord.filename);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Server error");
  }
});




router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Optional: check if user is owner or admin
    if (
      req.user.role !== "admin" &&
      file.uploadedBy?.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized to delete this file" });
    }
   // ✅ Delete file from disk
    const filePath = path.resolve(file.filepath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

   
    await file.deleteOne();
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;