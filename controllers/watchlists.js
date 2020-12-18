const Watchlist = require('../models/watchlist')
const Anime = require('../models/anime')

module.exports = {
  create
}

function addToWatchlist(req, res) {
  Watchlist.findOne({
    owner: req.user._id
  }).then((watchlist) => {
    if (!watchlist) {
      Anime.findOne({
        slug: req.body.slug
      }).then((anime) => {
        req.body.watchedBy = req.user._id
        req.body.owner = req.user._id
        req.body.anime = anime._id
        Watchlist.create(req.body)
          .then(() => {
            res.redirect(`/anime`)
            ///watchlist/${req.user._id}
          })
      })
    } else {
      Anime.findOne({ slug: req.body.slug }, (err, anime) => {
        watchlist.anime.push(anime._id)
        watchlist.save()
      })
      res.redirect('/anime')
    }
  })
}

function create(req, res) {
  Anime.findOne({
    slug: req.body.slug
  }).then((anime) => {
    if (!anime) {
      Anime.create(req.body)
        .then(() => {
          addToWatchlist(req, res)
        })
    } else {
      addToWatchlist(req, res)
    }
  })
}