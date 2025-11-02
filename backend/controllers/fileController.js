// const File = require("../models/File");
// const XLSX = require("xlsx");

// // Save metadata after upload
// exports.uploadFile = async (req, res) => {
//   try {
//     const file = new File({
//       filename: req.file.originalname,
//       filepath: req.file.path,
//       uploadedBy: req.user.id // from JWT middleware
//     });

//     await file.save();
//     res.json({ success: true, file });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Log the full file object
    console.log("Received file:", req.file);

    // ✅ Use Multer's provided path
    const filepath = req.file.path || `uploads/${req.file.filename}`;

    if (!filepath) {
      console.log("Filepath missing in req.file");
      return res.status(500).json({ message: "Filepath not set by Multer" });
    }

    const file = new File({
      filename: req.file.filename,
      filepath: filepath,
      size: req.file.size,
      uploadedBy: req.user.id ,
      uploadedAt: new Date(),
    });
    console.log("Uploading file for user:", req.user);

    await file.save();
    res.status(201).json(file);
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// Get all files (admin) or user’s files
// exports.getFiles = async (req, res) => {
//   try {
//     const query = req.user.role === "admin" ? {} : { uploadedBy: req.user.id };
//     const files = await File.find(query).sort({ uploadedAt: -1 });
//     res.json(files);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getFiles = async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? {}
      : { uploadedBy: req.user.id }; // ✅ use id

      console.log("Fetching files for user:", req.user.id);

    const files = await File.find(query).sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Parse Excel file data
exports.parseFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    const workbook = XLSX.readFile(file.filepath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





