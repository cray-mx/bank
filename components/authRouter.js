const express = require("express");
const router = express.Router();
const path = require("path");

const app = express();

app.use(express.json());

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/register.html"));
});

router.post("/register", (req, res) => {
  console.log(req.body);
});

module.exports = router;
