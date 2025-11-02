const Admin = require("../models/Admin");
const User = require("../models/User");
const File = require("../models/File");
const bcrypt = require("bcryptjs");

exports.getStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const adminCount = await Admin.countDocuments();
  const fileCount = await File.countDocuments();
  res.json({ userCount, adminCount, fileCount });
};

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await Admin.findOne({ email });
  if (existing) return res.status(400).json({ message: "Admin already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ name, email, password: hashed, role: "admin" });
  await newAdmin.save();
  res.status(201).json({ message: "Admin registered successfully" });
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.getFiles = async (req, res) => {
  const files = await File.find().populate("uploadedBy", "email");
  res.json(files);
};
