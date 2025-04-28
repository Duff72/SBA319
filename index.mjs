import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Chess from "./models/chess.mjs";
import Player from "./models/players.mjs";
import Piece from "./models/pieces.mjs";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded());
app.use(express.json());

// Mongoose Connection
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Chess API!");
});

// seed route
app.get("/games/seed", async (req, res) => {
  try {
    await Chess.create([
      {
        white: "Gukesh Dommaraju",
        black: "Ding Liren",
        draw: false,
        winner: "Ding Liren",
        info: "2024 FIDE World Championship Game 1",
        opening: "Advance French",
      },
      {
        white: "Magnus Carlsen",
        black: "Ian Nepomniachtchi",
        draw: false,
        winner: "Magnus Carlsen",
        info: "2021 World Chess Championship Game 6",
        opening: "Catalan",
      },
      {
        white: "Fabiano Caruana",
        black: "Levon Aronian",
        draw: true,
        winner: null,
        info: "Candidates Tournament 2018 Round 9",
        opening: "Ruy Lopez",
      },
      {
        white: "Alireza Firouzja",
        black: "Hikaru Nakamura",
        draw: false,
        winner: "Hikaru Nakamura",
        info: "Grand Swiss 2023 Round 7",
        opening: "Sicilian Defense",
      },
      {
        white: "Judit Polgar",
        black: "Garry Kasparov",
        draw: false,
        winner: "Garry Kasparov",
        info: "Linares 1994",
        opening: "King's Indian Defense",
      },
    ]);
    res.redirect("/games");
  } catch (error) {
    console.error(error);
  }
});

// GET all games - Index
app.get("/games", async (req, res) => {
  try {
    const chess = await Chess.find();
    res.json(chess);
  } catch (err) {
    console.log(err);
  }
});

// Delete - Delete one fruit by Id
app.delete("/games/:id", async (req, res) => {
  try {
    await Chess.findByIdAndDelete(req.params.id);
    res.redirect("/games"); //redirect back to chess index
  } catch (error) {
    console.error(error);
  }
});

// Update - Update an existing game by id
app.put("/games/:id", async (req, res) => {
  try {
    await Chess.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/games");
  } catch (error) {
    console.log(error);
  }
});

// Create - POST Create a new fruit
app.post("/games/", async (req, res) => {
  try {
    await Chess.create(req.body);

    res.redirect("/games");
  } catch (error) {
    console.log(error);
  }
});

//Show - GET one game by its ID
app.get("/games/:id", async (req, res) => {
  try {
    const chess = await Chess.findById(req.params.id);
    res.json(chess);
  } catch (err) {
    console.log(err);
  }
});

app.get("/players/seed", async (req, res) => {
  try {
    await Player.create([
      {
        name: "Magnus Carlsen",
        country: "Norway",
        rating: 2861,
      },
      {
        name: "Ding Liren",
        country: "China",
        rating: 2791,
      },
      {
        name: "Fabiano Caruana",
        country: "USA",
        rating: 2822,
      },
      {
        name: "Alireza Firouzja",
        country: "France",
        rating: 2784,
      },
      {
        name: "Hikaru Nakamura",
        country: "USA",
        rating: 2749,
      },
      {
        name: "Judit Polgar",
        country: "Hungary",
        rating: 2735,
      },
    ]);
    res.redirect("/players");
  } catch (error) {
    console.error(error);
  }
});

app.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/players/:id", async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.redirect("/players");
  } catch (error) {
    console.error(error);
  }
});

app.put("/players/:id", async (req, res) => {
  try {
    await Player.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/players");
  } catch (error) {
    console.log(error);
  }
});

app.post("/players/", async (req, res) => {
  try {
    await Player.create(req.body);

    res.redirect("/players");
  } catch (error) {
    console.log(error);
  }
});

app.get("/players/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.json(player);
  } catch (err) {
    console.log(err);
  }
});

// Routes for Pieces

// Seed Route - Populate the database with sample pieces
app.get("/pieces/seed", async (req, res) => {
  try {
    await Piece.create([
      { name: "Pawn", info: "Moves forward one square, captures diagonally." },
      { name: "Knight", info: "Moves in an L-shape, can jump over pieces." },
      { name: "Bishop", info: "Moves diagonally any number of squares." },
      {
        name: "Rook",
        info: "Moves horizontally or vertically any number of squares.",
      },
      {
        name: "Queen",
        info: "Moves diagonally, horizontally, or vertically any number of squares.",
      },
      { name: "King", info: "Moves one square in any direction." },
    ]);
    res.redirect("/pieces");
  } catch (error) {
    console.error(error);
  }
});

// Index Route - Get all pieces
app.get("/pieces", async (req, res) => {
  try {
    const pieces = await Piece.find();
    res.json(pieces);
  } catch (err) {
    console.log(err);
  }
});

// Show Route - Get one piece by its ID
app.get("/pieces/:id", async (req, res) => {
  try {
    const piece = await Piece.findById(req.params.id);
    res.json(piece);
  } catch (err) {
    console.log(err);
  }
});

// Create Route - Add a new piece
app.post("/pieces", async (req, res) => {
  try {
    await Piece.create(req.body);
    res.redirect("/pieces");
  } catch (error) {
    console.log(error);
  }
});

// Update Route - Update an existing piece by ID
app.put("/pieces/:id", async (req, res) => {
  try {
    await Piece.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/pieces");
  } catch (error) {
    console.log(error);
  }
});

// Delete Route - Delete a piece by ID
app.delete("/pieces/:id", async (req, res) => {
  try {
    await Piece.findByIdAndDelete(req.params.id);
    res.redirect("/pieces");
  } catch (error) {
    console.error(error);
  }
});

// App.listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
