const mongoose = require("mongoose");

const Adminschema = new mongoose.Schema(
  {
    adminname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    onAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", Adminschema);
