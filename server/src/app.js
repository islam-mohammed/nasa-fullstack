const express = require("express");
const cors = require("cors");
const path = require("path");
const planetRouter = require("./routes/planets.router");
const launchesRouter = require("./routes/launches.router");
const morgan = require("morgan");
const app = express();

// const whiteLisyOrigins = ["http://localhost:3000"];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (whiteLisyOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/planets", planetRouter);
app.use("/api/launches", launchesRouter);
app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
