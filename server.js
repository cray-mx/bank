const express = require("express");
const connect = require("./db/connect");
const cors = require("cors");
const app = express();
const customerModel = require("./db/customerSchema");

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
connect();

app.get("/", (req, res) => {
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

app.post("/create", (req, res) => {
  let doc = new customerModel({
    name: "Brian Chesky",
    email: "brianchesky@gmail.com",
    gender: "Male",
    balance: 78500,
  });
  doc
    .save()
    .then((result) => console.log("User created"))
    .catch((err) => console.log("Could not create user!"));
  res.send("<h1>User Created</h1>");
});

app.listen(PORT, () => console.log("Server is listening on", PORT));
