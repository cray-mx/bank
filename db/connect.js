const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => console.log("Connected to database!"))
    .catch((err) => console.log("Connection to database failed!"));
};

module.exports = connect;
