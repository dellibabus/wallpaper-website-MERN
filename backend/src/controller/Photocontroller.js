const Wallpaper = require("../model/wallschema");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

// Create a new wallpaper
const createPhoto = async (req, res) => {
  try {
    const { userName, email, photoName } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = file.filename;

    const wallpaper = new Wallpaper({
      userName,
      email,
      photoName: photoName || "Untitled",
      filePath,
      fileType: file.mimetype,
      fileOrginalName: file.originalname,
    });

    await wallpaper.save();

    res.status(200).json({
      message: "Wallpaper uploaded successfully",
      wallpaper,
    });
  } catch (err) {
    console.error("Error uploading wallpaper:", err);
    res
      .status(500)
      .json({ message: "Error uploading wallpaper", error: err.message });
  }
};

// Get all wallpapers with pagination
const getPhotos = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const wallpapers = await Wallpaper.find() 
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Wallpaper.countDocuments({ isDeleted: false });
    res.status(200).json({
      wallpapers,
      pagination: {
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    res
      .status(500)
      .json({ message: "Error fetching wallpapers", error: error.message });
  }
};

// Delete a wallpaper (soft delete)
const deletePhoto = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Wallpaper marked as deleted" });
  } catch (error) {
    console.error("Error deleting wallpaper:", error);
    res
      .status(500)
      .json({ message: "Error deleting wallpaper", error: error.message });
  }
};

module.exports = {
  createPhoto,
  getPhotos,
  deletePhoto,
};
