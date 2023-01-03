const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
