const express = require("express");
const connect = require("./db/connect");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const customerModel = require("./db/customerSchema");
const authRouter = require("./components/authRouter");
const PORT = process.env.PORT || 3000;
const verifyToken = require("./middleware/authorize");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
connect();

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/", authRouter); // authentication routes

app.get("/home", verifyToken, (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/customers", (req, res) => {
  res.sendFile(__dirname + "/public/html/customers.html");
});

app.get("/customerData", (req, res) => {
  customerModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/transactions", (req, res) => {});

app.get("/transfer", (req, res) => {
  res.sendFile(__dirname + "/public/html/transfer.html");
});

app.delete("/users", (req, res) => {
  customerModel
    .deleteMany({})
    .then((response) => res.json({ msg: "success" }))
    .catch((err) => res.json({ msg: "failure" }));
});

app.listen(PORT, () => console.log("Server is listening on", PORT));
