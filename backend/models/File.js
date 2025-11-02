// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   filepath: { type: String, required: true },
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   uploadedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("File", fileSchema);

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  size: { type: Number }, // in bytes
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", fileSchema);
