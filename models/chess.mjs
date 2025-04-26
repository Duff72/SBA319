import mongoose from "mongoose";

const chessSchema = new mongoose.Schema({
  white: { type: String, required: true },
  black: { type: String, required: true },
  draw: { type: Boolean, required: true },
  winner: { type: String },
  info: { type: String },
});

const Chess = mongoose.model("Chess", fruitSchema);

export default Chess;
