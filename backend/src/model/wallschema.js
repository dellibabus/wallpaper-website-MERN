const mongoose = require("mongoose");
const { v4 } = require("uuid");

const wallpaperSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
     
       },
    photoName: {
      type: String,
      default: "Untitled", // Default value
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileOrginalName: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false, // For soft delete
    },
  },
  { timestamps: true }
);

const Wallpaper = mongoose.model("wallpaper", wallpaperSchema);

module.exports = Wallpaper;
