const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  owner: String,
  anime: [{
    type: Schema.Types.ObjectId,
    ref: 'Anime'
  }],
  favoritedBy: {
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

module.exports = mongoose.model("Favorite", favoriteSchema);