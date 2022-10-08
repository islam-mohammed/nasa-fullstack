const express = require("express");
const cors = require("cors");
const path = require("path");
var cookieParser = require("cookie-parser");
const planetRouter = require("./routes/planets.router");
const launchesRouter = require("./routes/launches.router");
const morgan = require("morgan");
const helmet = require("helmet");
const auth = require("./middlewares/auth.middleware");
const authRouter = require("./routes/auth.router");
const cookieSession = require("cookie-session");
const { authInit } = require("./services/auth");
const passport = require("passport");

const app = express();
// app.use(helmet());

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    maxAge: 1000 * 60 * 60 * 24,
    keys: [process.env.SESSION_SECRET_1, process.env.SESSION_SECRET_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authInit();

app.use(express.static(path.join(__dirname, "..", "public")));

// Routers
app.use("/auth", authRouter);
app.use("/failuer", (req, res) => {
  return res.send("fail to log in");
});
app.use("/api/planets", planetRouter);
app.use("/api/launches", launchesRouter);
app.use("/api/secret", auth, (req, res) => {
  return res.send("You are logged in");
});
app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
