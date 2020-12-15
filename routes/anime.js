const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;