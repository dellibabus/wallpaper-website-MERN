const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(__dirname, "../fileStorage");
    console.log("File upload destination:", filePath);
    cb(null, filePath); 
  },
  filename: (req, file, cb) => {
    
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload = multer({ storage });

const singleUpload = upload.single("image");

module.exports = singleUpload;
