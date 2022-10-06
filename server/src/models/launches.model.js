const launchModel = require("./launches.schema");
const planetModel = require("./planets.schema");
const axios = require("axios");
const { getPagination } = require("../services/query");
const SPACEX_URL = "https://api.spacexdata.com/v4";

async function getLaunchesData(query) {
  const { skip, limit } = getPagination(query);
  console.log(skip, limit);
  return await launchModel
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({ fligtNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function isSpaceDataLoaded(flightId) {
  return await launchModel.findOne({
    flightNumber: 1,
  });
}

function getLauncheDataById(id) {
  return launches.get(id);
}
async function generateNewFlightNumber() {
  const lastLuanch = await launchModel.findOne().sort({ flightNumber: -1 });
  return lastLuanch ? lastLuanch.flightNumber + 1 : 100;
}

async function loadSpaceXData() {
  const isSpaceXDataLoaded = await isSpaceDataLoaded();
  if (!isSpaceXDataLoaded) {
    const response = await axios.post(`${SPACEX_URL}/launches/query`, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: "name",
          },
          {
            path: "payloads",
            select: "customers",
          },
        ],
      },
    });
    const launchDocs = response.data.docs;
    for (let launchDoc of launchDocs) {
      const customers = launchDoc["payloads"].flatMap(
        (payload) => payload.customers
      );
      const launch = {
        flightNumber: launchDoc["flight_number"],
        launchDate: launchDoc["date_local"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        upcoming: launchDoc["upcoming"],
        customers,
        success: launchDoc["success"],
      };
      saveLaunch(launch, false);
    }
  }
}

async function saveLaunch(launch, targetRequired = ture) {
  const planetExists =
    (targetRequired &&
      (await planetModel.findOne({ keplerName: launch.target }))) ||
    true;
  if (planetExists) {
    const flightNumber =
      launch["flightNumber"] || (await generateNewFlightNumber());
    const newPlanet = {
      ...launch,
      flightNumber,
      launchDate: new Date(launch.launchDate),
      upcoming: launch.upcoming || true,
      success: launch.sucess || true,
      customers: launch?.customers || [("ZTM", "NASA")],
    };
    try {
      const newLaunch = await launchModel.findOneAndUpdate(
        { flightNumber: launch.flightNumber },
        newPlanet,
        {
          upsert: true,
          runValidators: true,
        }
      );
      return newPlanet;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Target planet is not exist!");
}

async function deleteLaunchDate(id) {
  return await launchModel.deleteOne({ flightNumber: id });
}

module.exports = {
  getLaunchesData,
  getLauncheDataById,
  saveLaunch,
  deleteLaunchDate,
  loadSpaceXData,
};
