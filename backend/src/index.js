const express = require("express");
const connections=require("./config/connectiondb")
const photoRoute = require("./routes/photo.route")
const adminRoute = require("./routes/admin.route")
const cors=require("cors")


const app = express();
app.use(cors("*")) 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connections.connect();
app.use("/upload", express.static("src/fileStorage"));


app.use("/photo", photoRoute)
app.use("/admin", adminRoute)

//http://localhost:7000/upload/1733254662486-InShot_20240825_115055817.jpg

app.use("/", (req, res) => {
    res.send("I'm alive")
});

const port = 7000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});