const {
  getLaunchesData,
  saveLaunch,
  deleteLaunchDate,
} = require("../models/launches.model");

async function getAllLaunches(req, res) {
  const launches = await getLaunchesData(req.query);
  return res.status(200).json(launches);
}

async function postLaunch(req, res) {
  try {
    const launch = await saveLaunch(req.body);
    return res.status(201).json(launch);
  } catch (err) {
    return res.status(500).json({ error: err.message, ok: false });
  }
}
async function deleteLaunch(req, res) {
  const flightNumber = parseInt(req.params.id);
  const { deletedCount } = await deleteLaunchDate(flightNumber);
  if (deletedCount) {
    return res.status(200).json({
      message: "Launch was aborted!",
    });
  } else {
    return res.status(404).json({
      error: "Flight no is not correct",
    });
  }
}

module.exports = {
  getAllLaunches,
  postLaunch,
  deleteLaunch,
};
