const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "email is required to signup"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["creator", "user"],
    default: "user",
  },
});

const userModel = mongoose.model("User" , userSchema)

module.exports = userModel