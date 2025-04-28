import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  rating: { type: Number },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
