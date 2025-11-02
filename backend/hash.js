const bcrypt = require("bcryptjs");

(async () => {
  const hash = await bcrypt.hash("admin123", 10);
  console.log(hash);
})();

const bcrypt = require("bcryptjs");
const Superadmin = require("./models/Superadmin");

const createSuperadmin = async () => {
  const hashed = await bcrypt.hash("sad", 10);
  const superadmin = new Superadmin({
    name: "Master Admin",
    email: "superadmin@example.com",
    password: hashed,
  });
  await superadmin.save();
  console.log("Superadmin created");
};

createSuperadmin();
