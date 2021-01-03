const axios = require('axios');
const Anime = require('../models/anime')
const Watchlist = require('../models/watchlist')
const Favorite = require('../models/favorite');


module.exports = {
  index,
  details,
  create,
  search
}

function index(req, res) {
  let num = 16 * (Number(req.query.page) - 1)
  const api = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=16&page%5Boffset%5D=${num}`
  axios.get(api)
    .then((resp) => {
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, anime: resp.data.data, links: resp.data.links, page: req.query.page });
    })
}

function search(req, res) {
  const query = req.query.search.split(' ').join('%20')
  const api = `https://kitsu.io/api/edge/anime?filter[text]=${query}`
  axios.get(api)
    .then((resp) => {
      res.render("anime/search", { title: "Anime Search", user: req.user ? req.user : null, anime: resp.data.data, links: resp.data.links });
    })
}

function details(req, res) {
  axios
    .get(`https://kitsu.io/api/edge/anime/${req.params.id}`)
    .then((response) => {
      //if anime isnt in the db add mvp info here and then display the page
      const data = {}

      Favorite.findOne({
        owner: req.user._id,
      })
        .populate('anime')
        .then((favorite) => {
          if (favorite) {

            for (let i = 0; i < favorite.anime.length; i++) {
              const a = favorite.anime[i];
              if (Number(a.kitsuId) === Number(req.params.id)) {
                data.faved = true
                break;
              }
              data.faved = false
            }
          }
        }).then(() => {
          Watchlist.findOne({
            owner: req.user._id,
          })
            .populate('anime')
            .then((watchlist) => {

              if (watchlist) {

                for (let i = 0; i < watchlist.anime.length; i++) {
                  const a = watchlist.anime[i];
                  if (Number(a.kitsuId) === Number(req.params.id)) {
                    data.added = true
                    break;
                  }
                  data.added = false
                }
              }

              console.log(data.faved);

              res.render("anime/details", {
                title: "Anime Details",
                user: req.user,
                anime: response.data.data,
                watchlist,
                added: data.added,
                favorited: data.faved
              });
            })
        })
    });
}

function create(req, res) {
  Anime.findOne({
    slug: req.body.slug
  }).then((anime) => {
    if (!anime) {
      Anime.create(req.body, (err, anime) => {
        res.redirect('/anime')
      })
    } else {
      res.redirect('/anime')
    }
  })
}