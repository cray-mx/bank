const express = require("express");
const router = express.Router();
const path = require("path");
const customerModel = require("../db/customerSchema");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/register.html"));
});

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const balance = 5000;
  customerModel
    .findOne({ email: email })
    .then((res) => {
      if (res !== null) {
        res.json({ msg: "failure" });
      }
    })
    .catch((err) => res.json({ msg: "failure" }));
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const customerData = new customerModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        balance: balance,
      });
      customerData
        .save()
        .then((response) => res.json({ msg: "success" }))
        .catch((err) => res.json({ msg: "failure" }));
    })
    .catch((err) => res.json({ msg: "failure" }));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  customerModel.findOne({ email: email }).then((doc) => {
    bcrypt
      .compare(password, doc.password)
      .then((result) => {
        if (result) res.json({ msg: "success" });
        else res.json({ msg: "failure" });
      })
      .catch((err) => {
        res.json({ msg: "failure" });
      });
  });
});

module.exports = router;
