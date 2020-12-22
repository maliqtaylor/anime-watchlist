const router = require("express").Router();
const favoriteCtrl = require('../controllers/favorites')

router.post('/', isLoggedIn, favoriteCtrl.add)
router.delete('/:id', isLoggedIn, favoriteCtrl.remove)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;