const User = require("../models/user");
const Favorite = require("../models/favorite");

module.exports = {
  profile,
  update,
  addFriend,
  removeFriend
};

function profile(req, res) {
  const data = {}

  Favorite.findOne({
    owner: req.user._id
  })
    .populate('anime')
    .then((favorite) => {
      if (favorite) {
        data.anime = favorite.anime
      } else {
        data.anime = null
      }
    })
    .then(() => {
      User.findById(req.user._id)
        .then((user) => {
          res.render("users/profile", { title: "Profile Page", user, anime: data.anime })
        }).catch((err) => {
          console.log(err);
          res.render("error")
        })
    })
}


function update(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then(() => {
      res.redirect(`/users/${req.user._id}`)
    })
}

function addFriend(req, res) {
  req.user.friends.push(req.params.id)
  req.user.save()
    .then(() => {
      res.redirect(`/users/${req.params.id}`)
    })
}

function removeFriend(req, res) {
  let idx = req.user.friends.indexOf(req.params.id)
  req.user.friends.splice(idx, 1)
  req.user.save()
    .then(() => {
      res.redirect(`/users/${req.params.id}`)
    })
}