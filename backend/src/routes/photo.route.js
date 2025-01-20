const express = require("express");
const controller = require("../controller/Photocontroller");
const singleUpload = require("../middleware/multer");

const router = express.Router();

router.get("/getAll", controller.getPhotos);

router.post("/create", singleUpload, controller.createPhoto);

router.delete("/:id", controller.deletePhoto);


router.get("/download", (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filePath); // Ensure this points to your actual uploads folder
  
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error while downloading the file:", err);
        res.status(500).send("File not found or error occurred.");
      }
    });
  });
module.exports = router;
