const router = require("express").Router();
const animeCtrl = require('../controllers/anime')

router.get("/", isLoggedIn, animeCtrl.index);
router.get('/:id', isLoggedIn, animeCtrl.details);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;