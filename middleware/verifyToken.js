const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token == null) {
    res.auth = false;
    next();
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.auth = false;
        next();
        return;
      }
      req.user = user;
      res.auth = true;
      next();
    });
  }
};

module.exports = verifyToken;
