const express = require("express");
const passport = require("passport");
const { logout } = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.get("/google", passport.authenticate("google"));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failuer",
    successRedirect: "/",
  })
);
authRouter.get("/logout", logout);

module.exports = authRouter;
