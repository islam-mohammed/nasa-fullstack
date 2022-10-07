const express = require("express");
const passport = require("passport");
const { logout } = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failuerRedirect: "/failuer",
    successRedirect: "/",
    session: false,
  })
);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);
authRouter.get("/logout", logout);

module.exports = authRouter;
