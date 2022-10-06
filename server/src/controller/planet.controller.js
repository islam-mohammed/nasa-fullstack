const { getPlannetData } = require("../models/planets.model");

async function getAllPlanets(req, res) {
  try {
    const planets = await getPlannetData();
    return res.status(200).json(planets);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = { getAllPlanets };
