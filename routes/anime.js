const router = require("express").Router();
const animeCtrl = require('../controllers/anime')

router.get("/", isLoggedIn, animeCtrl.index);
router.get("/prev", isLoggedIn, animeCtrl.prev);
router.get("/next", isLoggedIn, animeCtrl.next);
router.get('/:id', isLoggedIn, animeCtrl.details);
router.post('/', animeCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;