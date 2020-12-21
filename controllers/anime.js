const axios = require('axios');
const Anime = require('../models/anime')
let num = 0

module.exports = {
  index,
  details,
  create,
  prev,
  next,
}

function index(req, res) {
  num = 0
  const api = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=16&page%5Boffset%5D=${num}`
  axios.get(api)
    .then((resp) => {
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, anime: resp.data.data, links: resp.data.links, num: num });
    })
}

function next(req, res) {
  num += 16
  const api = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=16&page%5Boffset%5D=${num}`
  axios.get(api)
    .then((resp) => {
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, anime: resp.data.data, links: resp.data.links, num: num });
    })
}

function prev(req, res) {
  num -= 16
  const api = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=16&page%5Boffset%5D=${num}`
  axios.get(api)
    .then((resp) => {
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, anime: resp.data.data, links: resp.data.links, num: num });
    })
}

function details(req, res) {
  axios
    .get(`https://kitsu.io/api/edge/anime/${req.params.id}`)
    .then((response) => {
      //if anime isnt in the db add mvp info here and then display the page
      Anime.findOne({
        slug: req.body.slug
      })
        .populate('favoritedBy')
        .then((anime) => {
          if (anime) {
            res.render("anime/details", {
              title: "Anime Details",
              user: req.user,
              anime: response.data.data,
              favoritedBy: anime.favoritedBy,
              animeId: anime._id,
            });
          } else {
            res.render("anime/details", {
              title: "Anime Details",
              user: req.user,
              anime: response.data.data,
              favoritedBy: [""],
            });
          }
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