const axios = require('axios');
const Anime = require('../models/anime')

module.exports = {
  index,
  details
}

function index(req, res) {
  axios.get(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0`)
    .then((resp) => {
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, data: resp.data.data });
    })
}

function details(req, res) {
  axios
    .get(`https://kitsu.io/api/edge/anime/${req.params.id}`)
    .then((response) => {
      //if anime isnt in the db add mvp info here and then display the page
      Anime.findOne({ slug: response.data.slug })
        .populate('favoritedBy')
        .then((anime) => {
          if (anime) {
            res.render("anime/details", {
              title: "Anime Details",
              user: req.user,
              anime: response.data,
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