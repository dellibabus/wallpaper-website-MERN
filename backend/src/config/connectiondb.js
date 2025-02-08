
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://dbdellibabu:6rE9a2BBF2kujFoM@wallpaper-website.jvwnj.mongodb.net/server001?retryWrites=true&w=majority&appName=wallpaper-website",
      {}
    )
    .then(() => {
      console.log("Database connected successfully....");
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

module.exports = { connect };
