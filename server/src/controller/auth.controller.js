function logout(req, res) {
  req.logout();
  return res.redirect("/");
}

module.exports = {
  logout,
};
