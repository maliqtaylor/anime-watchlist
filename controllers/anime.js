const axios = require('axios');

module.exports = {
  index
}

function index(req, res) {
  axios.get(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0`)
    .then((resp) => {
      console.log(resp.data.data[0].attributes);
      res.render("anime/index", { title: "Anime Index", user: req.user ? req.user : null, data: resp.data.data });
    })

}