const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connect = require("./db/connect");
const customerModel = require("./db/customerSchema");
const transferModel = require("./db/transferSchema");
const authRouter = require("./components/authRouter");
const verifyToken = require("./middleware/verifyToken");
const e = require("express");

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
  if (res.auth) res.sendFile(__dirname + "/public/html/customers.html");
  else res.sendFile(__dirname + "/public/html/401.html");
});

app.get("/transactions", (req, res) => {
  if (res.auth) res.sendFile(__dirname + "/public/html/transactions.html");
  else res.sendFile(__dirname + "/public/html/401.html");
});

app.get("/transfer", (req, res) => {
  if (res.auth) res.sendFile(__dirname + "/public/html/transfer.html");
  else res.sendFile(__dirname + "/public/html/401.html");
});

app.get("/customerData", (req, res) => {
  customerModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/transferData", (req, res) => {
  transferModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post("/transfer", (req, res) => {
  console.log(req.body);
  const amount = Number(req.body.amount);
  const transferDetails = new transferModel({
    sender: req.body.sender,
    senderEmail: req.body.senderEmail,
    recipient: req.body.recipient,
    recipientEmail: req.body.recipientEmail,
    amount: amount,
  });
  transferDetails
    .save()
    .then((doc) => {
      customerModel
        .findOneAndUpdate(
          { email: req.body.senderEmail },
          { $inc: { balance: -amount } }
        )
        .then()
        .catch((err) => {
          return res.json({ msg: "failure" });
        });

      customerModel
        .findOneAndUpdate(
          { email: req.body.recipientEmail },
          { $inc: { balance: amount } }
        )
        .then()
        .catch((err) => {
          return res.json({ msg: "failure" });
        });

      res.json({ msg: "success" });
    })
    .catch((err) => res.json({ msg: "failure" }));
});

app.get("/balance/:email", (req, res) => {
  customerModel
    .findOne({ email: req.params.email })
    .then((doc) => res.json({ balance: doc.balance }))
    .catch((err) => console.log(err));
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
