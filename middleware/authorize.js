const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token == null) return res.status(401).json({ msg: "failure" });
  else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ msg: "failure" });
      req.user = user;
      next();
    });
  }
};

module.exports = verifyToken;
