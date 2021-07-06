const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../Model");

const ManagerInfo = db.ManagerInfos;
//verify token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const checkDuplicateEmail = (req, res, next) => {
  console.log("check email Duplicate");
  ManagerInfo.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  verifyToken: verifyToken,
  checkDuplicateEmail: checkDuplicateEmail,
};
module.exports = verifySignUp;
