require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

function authInit() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile"],
      },
      verifyCallBack
    )
  );
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
}

function verifyCallBack(accessToken, refreshToken, profile, done) {
  // save profile to the database

  done(null, profile);
}

// save the session to the cookie
function serialize(user, done) {
  done(null, user.id);
}
// Read the session from the cookie
function deserialize(id, done) {
  done(null, id);
}

module.exports = {
  authInit,
};
