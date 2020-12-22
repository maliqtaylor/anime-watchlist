const Watchlist = require('../models/watchlist')
const Anime = require('../models/anime')

module.exports = {
  create,
  details,
  remove,
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
            res.redirect(`/anime/${anime.kitsuId}`)
          })
      })
    } else {
      Anime.findOne({ slug: req.body.slug }, (err, anime) => {
        if (!watchlist.anime.includes(anime._id)) {
          watchlist.anime.push(anime._id)
        }
        watchlist.save()
        res.redirect(`/anime/${anime.kitsuId}`)
      })
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

function details(req, res) {
  res.render('watchlist/details', { title: 'Watchlist', user: req.user ? req.user : null })
}

function remove(req, res) {
  Watchlist.findOne({
    owner: req.user._id
  })
    .populate('anime')
    .then((watchlist) => {
      let idx = watchlist.anime.findIndex((a) => Number(a.kitsuId) === Number(req.params.id))
      watchlist.anime.splice(idx, 1)
      watchlist.save()
      res.redirect(`/anime/${req.params.id}`)
    })
}