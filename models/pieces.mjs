import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: true },
});

const Piece = mongoose.model("Piece", pieceSchema);

export default Piece;
