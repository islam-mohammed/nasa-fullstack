const express = require("express");
const cors = require("cors");
const path = require("path");
const planetRouter = require("./routes/planets.router");
const launchesRouter = require("./routes/launches.router");
const morgan = require("morgan");
const helmet = require("helmet");
const auth = require("./middlewares/auth.middleware");
const authRouter = require("./routes/auth.router");
const cookie = require("cookie-session");

require("./services/google_auth").config();

const app = express();
app.use(helmet());
app.use(cookie({}));
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/auth", authRouter);
app.use("/failuer", (req, res) => {
  return res.send("fail to log in");
});
app.use("/api/planets", auth, planetRouter);
app.use("/api/launches", launchesRouter);
app.use("/api/sercet", auth, (req, res) => {
  return res.send("You are logged in");
});
app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
