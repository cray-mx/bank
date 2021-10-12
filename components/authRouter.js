const express = require("express");
const router = express.Router();
const path = require("path");
const customerModel = require("../db/customerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
require("dotenv").config();

const app = express();
app.use(verifyToken);

app.use(express.json());

router.get("/login", (req, res) => {
  if (res.auth) res.redirect("/home");
  else res.sendFile(path.join(__dirname, "../public/html/login.html"));
});

router.get("/register", (req, res) => {
  if (res.auth) res.redirect("/home");
  else res.sendFile(path.join(__dirname, "../public/html/register.html"));
});

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const balance = 5000;
  customerModel
    .findOne({ email: email })
    .then((doc) => {
      if (doc) return res.status(401).json({ msg: "email_failure" });
      else {
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
              .then((doc) => {
                const user = {
                  subjectId: doc._id,
                  name: doc.firstName + " " + doc.lastName,
                  email: doc.email,
                };
                const accessToken = jwt.sign(user, process.env.SECRET_KEY);
                res.cookie("jwt", accessToken);
                return res.json({ msg: "success" });
              })
              .catch((err) => res.json({ msg: "failure" }));
          })
          .catch((err) => res.json({ msg: "failure" }));
      }
    })
    .catch((err) => res.json({ msg: "failure" }));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  customerModel.findOne({ email: email }).then((doc) => {
    if (doc) {
      bcrypt
        .compare(password, doc.password)
        .then((result) => {
          if (result) {
            const user = {
              subjectId: doc._id,
              name: doc.firstName + " " + doc.lastName,
              email: doc.email,
            };
            const accessToken = jwt.sign(user, process.env.SECRET_KEY);
            res.cookie("jwt", accessToken);
            return res.json({ msg: "success" });
          } else return res.json({ msg: "failure" });
        })
        .catch((err) => {
          res.json({ msg: "failure" });
        });
    } else {
      res.json({ msg: "failure" });
    }
  });
});

module.exports = router;
