const mongoose = require('mongoose')
const { Schema } = mongoose

const watchlistSchema = new Schema({
  owner: String,
  anime: [{
    type: Schema.Types.ObjectId,
    ref: 'Anime'
  }],
  watchedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})


module.exports = mongoose.model('Watchlist', watchlistSchema)