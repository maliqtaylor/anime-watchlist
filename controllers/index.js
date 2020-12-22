const Anime = require('../models/anime')

module.exports = {
  index,
}

function index(req, res) {
  Anime.aggregate([{ $sample: { size: 5 } }])
    .then((anime) => {
      console.log(anime);
      res.render("index", { title: "Home Page", user: req.user ? req.user : null, anime })
    })
}