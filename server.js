const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connect = require("./db/connect");
const customerModel = require("./db/customerSchema");
const transferModel = require("./db/transferSchema");
const authRouter = require("./components/authRouter");
const verifyToken = require("./middleware/verifyToken");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(verifyToken);
connect();

app.get("/", (req, res) => {
  if (res.auth) res.redirect("/home");
  else res.redirect("/login");
});

app.use("/", authRouter); // authentication routes

app.get("/home", (req, res) => {
  if (res.auth) res.sendFile(__dirname + "/public/html/index.html");
  else res.sendFile(__dirname + "/public/html/401.html");
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

app.post("/transfer", (req, res) => {
  console.log(req.body);
  const transferDetails = new transferModel({
    sender: req.body.sender,
    senderEmail: req.body.senderEmail,
    recipient: req.body.recipient,
    recipientEmail: req.body.recipientEmail,
    amount: Number(req.body.amount),
  });
  res.json({ msg: "success" });
});

app.delete("/users", (req, res) => {
  customerModel
    .deleteMany({})
    .then((response) => res.json({ msg: "success" }))
    .catch((err) => res.json({ msg: "failure" }));
});

app.use((req, res) => {
  res.sendFile(__dirname + "/public/html/404.html");
});

app.listen(PORT, () => console.log("Server is listening on", PORT));
