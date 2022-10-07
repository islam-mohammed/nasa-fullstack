require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = require("./app");
const { loadSpaceXData } = require("./models/launches.model");
const { loadPlanetData } = require("./models/planets.model");
const { dbConnect } = require("./services/mongo");

const PORT = process.env.PORT || 3000;
const server = https.createServer(
  {
    key: fs.readFileSync(__dirname + "/key.pem"),
    cert: fs.readFileSync(__dirname + "/cert.pem"),
  },
  app
);

async function startServer() {
  await dbConnect();
  await loadPlanetData();
  await loadSpaceXData();
  server.listen(PORT, () =>
    console.log(`Lestening to port number ${PORT}. PID: ${process.pid}`)
  );
}

startServer();
