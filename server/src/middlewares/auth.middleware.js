const HttpError = require("http-errors");
module.exports = function (req, res, next) {
  console.log("///////////////////////");
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    next(new HttpError.Unauthorized("You are not logged in"));
  }
  next();
};
