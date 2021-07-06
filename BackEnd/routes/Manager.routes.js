const { checkDuplicateEmail } = require("../middleware/authJwt");
const { SignUp, SignIn } = require("../controller/Managerdata");

const managerRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/SignUp", [checkDuplicateEmail], SignUp);

  app.post("/api/auth/SignIn", SignIn);
};

module.exports = managerRoutes;
