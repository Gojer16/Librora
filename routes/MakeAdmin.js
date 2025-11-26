require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function makeAdmin() {
  await mongoose.connect(process.env.DB_URI_TEST);

  const user = await User.findOneAndUpdate(
    { email: "dovaking927@gmail.com" },
    { role: "Admin" },
    { new: true }
  );

  console.log("Updated user:", user);
  mongoose.disconnect();
}

makeAdmin();