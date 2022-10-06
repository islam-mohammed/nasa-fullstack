const {
  getAllLaunches,
  postLaunch,
  deleteLaunch,
} = require("../controller/launches.controller");
const {
  lanchValidationRules,
  launchValidate,
} = require("../middlewares/launch.validator");

const express = require("express");

const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", lanchValidationRules(), launchValidate, postLaunch);
launchesRouter.delete("/:id", deleteLaunch);

module.exports = launchesRouter;
