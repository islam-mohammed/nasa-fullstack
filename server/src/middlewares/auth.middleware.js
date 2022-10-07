module.exports = function (req, res, next) {
  // check if user is authinticated
  const isLoggedIn = true;

  if (!isLoggedIn)
    return res.status(401).json({
      error: "You must login",
    });
  next();
};
