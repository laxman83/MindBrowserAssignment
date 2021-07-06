const db = require("../Model");
const config = require("../config/auth.config");
const ManagerInfo = db.ManagerInfos;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const SignUp = (req, res) => {
  try {
    const myPlaintextPassword = req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    const today = new Date();
    const managerData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      dob: req.body.dob,
      company: req.body.company,
      created: today,
    };
    console.log("manager data", managerData);
    //Save data in Database
    ManagerInfo.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        ManagerInfo.create(managerData).then((user) => {
          res.status(200).send({ status: "Register successfully", user });
        });
      } else {
        res.send({ error: "User already exists" });
      }
    });
  } catch (err) {
    res.send("error: " + err);
  }
};

const SignIn = (req, res) => {
  try {
    console.log("value is ", req.body);

    ManagerInfo.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      console.log("login user is ", user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      console.log("inside loginPassword", passwordIsValid);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      } else {
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        console.log("token is", token);
        res.status(200).send({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          accessToken: token,
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  SignUp,
  SignIn,
};
