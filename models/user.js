const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    nickname: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);