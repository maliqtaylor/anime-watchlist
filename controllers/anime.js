const axios = require('axios');
const { response } = require('express');

module.exports = {
  index
}

function index(req, res) {
  axios.get(`https://kitsu.io/api/edge/anime?page[limit]=9&page[offset]=0`)
    .then((response) => {
      console.log(response.data.data[0].attributes);
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, data: response.data.data });
    })

}