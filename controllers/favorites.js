const Favorite = require('../models/favorite')
const Anime = require('../models/anime')
const User = require('../models/user')

module.exports = {
  getAll,
  add,
  remove
}

function getAll(params) {

}

function add(req, res) {

  Favorite.findOne({
    owner: req.user._id
  }).then((favorite) => {
    if (!favorite) {
      Anime.findOne({
        slug: req.body.slug
      }).then((anime) => {
        req.body.favoritedBy = req.user._id
        req.body.owner = req.user._id
        req.body.anime = anime._id
        Favorite.create(req.body)
          .then(() => {
            res.redirect(`/anime/${anime.kitsuId}`)
          })
      })
    } else {
      Anime.findOne({ slug: req.body.slug }, (err, anime) => {
        if (!favorite.anime.includes(anime._id)) {
          favorite.anime.push(anime._id)
        }
        favorite.save()
        res.redirect(`/anime/${anime.kitsuId}`)
      })
    }
  })
}

function remove(req, res) {
  Favorite.findOne({
    owner: req.user._id
  })
    .populate('anime')
    .then((favorite) => {
      let idx = favorite.anime.findIndex((a) => Number(a.kitsuId) === Number(req.params.id))
      favorite.anime.splice(idx, 1)
      favorite.save()
      res.redirect(`/anime/${req.params.id}`)
    })
}


