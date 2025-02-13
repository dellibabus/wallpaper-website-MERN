const mongoose = require("mongoose");
require("dotenv").config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected......");
    })
    .catch((err) => {
      console.log(`Connection Error ${err}`);
    });
}

module.exports = { connect };
