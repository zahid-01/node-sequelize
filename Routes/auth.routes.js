const {
  signUp,
  login,
  genOtp,
  verifyOtp,
} = require("../Controllers/auth.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/genOtp", genOtp);
AuthRouter.post("/verifyOtp", verifyOtp);

module.exports = AuthRouter;
