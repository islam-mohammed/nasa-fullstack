require("dotenv").config();
const http = require("http");
const app = require("./app");
const { loadSpaceXData } = require("./models/launches.model");
const { loadPlanetData } = require("./models/planets.model");
const { dbConnect } = require("./services/mongo");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

async function startServer() {
  await dbConnect();
  await loadPlanetData();
  await loadSpaceXData();
  server.listen(PORT, () =>
    console.log(`Lestening to port number ${PORT}. PID: ${process.pid}`)
  );
}

startServer();
