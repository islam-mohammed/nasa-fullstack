const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const planetModel = require("./planets.schema");

const planets = [];

function isHabitaedPlant(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

async function getPlannetData() {
  try {
    return planetModel.find({}).sort("keplerName");
  } catch (error) {
    throw new Error(`Error in getting planets data!`);
  }
}

async function loadPlanetData() {
  return new Promise((resolve, reject) => {
    if (!planets.length) {
      fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
        .pipe(
          parse({
            comment: "#",
            columns: true,
          })
        )
        .on("data", async (chunck) => {
          if (isHabitaedPlant(chunck)) {
            saveOrUpdatePlanet(chunck);
          }
        })
        .on("error", (err) => reject(err))
        .on("end", async () => {
          resolve(await planetModel.find({}, { __v: 0 }));
        });
    }
  });
}

async function saveOrUpdatePlanet(chunck) {
  try {
    await planetModel.findOneAndUpdate(
      { keplerName: chunck["keplerName"] },
      {
        keplerName: chunck["keplerName"],
        Disposition: chunck["koi_disposition"],
        Score: chunck["koi_score"],
        Insol: chunck["koi_insol"],
        Prad: chunck["koi_prad"],
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    throw new Error(err.message);
  }
}

module.exports = {
  loadPlanetData,
  getPlannetData,
};
