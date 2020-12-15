const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home Page", user: req.user ? req.user : null });
});

module.exports = router;