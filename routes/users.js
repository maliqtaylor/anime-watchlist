const router = require("express").Router();
const usersCtrl = require("../controllers/users");

router.get("/:id", isLoggedIn, usersCtrl.profile);
router.get("/:id/friend", isLoggedIn, usersCtrl.addFriend);
router.get("/:id/unfriend", isLoggedIn, usersCtrl.removeFriend);
router.put("/:id", isLoggedIn, usersCtrl.update);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;