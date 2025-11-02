const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Superadmin = require("./models/Superadmin");

const createSuperadmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await Superadmin.findOne({ email: "superadmin@example.com" });
    if (existing) {
      console.log("⚠️ Superadmin already exists");
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash("sadmin", 10);

    const superadmin = new Superadmin({
      name: "Master Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    });

    await superadmin.save();
    console.log("✅ Superadmin created successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error creating superadmin:", err.message);
    mongoose.disconnect();
  }
};

createSuperadmin();
