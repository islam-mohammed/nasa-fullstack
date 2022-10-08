const HttpError = require("http-errors");
module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    next(new HttpError.Unauthorized("You are not logged in"));
  }
  next();
};
