const mongoose = require("mongoose");
const { Schema } = mongoose;

const animeSchema = new Schema(
  {
    title: String,
    slug: String,
    kitsuId: Number,
    released: Date,
    imageUrl: String,
    synopsis: String,
    favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Anime", animeSchema);