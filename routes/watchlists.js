const router = require("express").Router();
const watchlistCtrl = require('../controllers/watchlists')

router.post('/', isLoggedIn, watchlistCtrl.create)
router.get('/:id', isLoggedIn, watchlistCtrl.details)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}



module.exports = router;