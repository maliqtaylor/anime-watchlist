const mongoose = require("mongoose");
const { Schema } = mongoose;

const animeSchema = new Schema(
  {
    slug: { type: String },
    kitsuId: Number,
    imageUrl: { type: String },
    favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Anime", animeSchema);