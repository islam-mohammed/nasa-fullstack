require("dotenv").config();

const googlePassport = require("passport");
const { Strategy } = require("passport-google-oauth20");

function config() {
  googlePassport.use(
    new Strategy(
      {
        callbackURL: "/auth/google/callback",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      verifyCallBack
    )
  );
}

function verifyCallBack(accessToken, refreshToken, profile, done) {
  // save profile to the database
  console.log("Google Profile", profile);
  done(null, profile);
}

module.exports = { config };
