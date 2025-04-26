import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Chess from "./models/chess.mjs";

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
app.get("/chess/seed", async (req, res) => {
  try {
    await Chess.create([
      {
        white: "Gukesh Dommaraju",
        black: "Ding Liren",
        draw: false,
        winner: "Ding Liren",
        info: "2024 FIDE World Championship Game 1",
      },
    ]);
    res.redirect("/chess");
  } catch (error) {
    console.error(error);
  }
});

// INDUCES

// GET all games - Index
app.get("/chess", async (req, res) => {
  try {
    const chess = await Chess.find();
    res.json(chess);
  } catch (err) {
    console.log(err);
  }
});

// New - to be handled by our front end

// Delete - Delete one fruit by Id
app.delete("/chess/:id", async (req, res) => {
  try {
    await Chess.findByIdAndDelete(req.params.id);
    res.redirect("/chess"); //redirect back to chess index
  } catch (error) {
    console.error(error);
  }
});

// Update - Update an existing game by id
app.put("/chess/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/chess");
  } catch (error) {
    console.log(error);
  }
});

// Create - POST Create a new fruit
app.post("/chess/", async (req, res) => {
  try {
    await Chess.create(req.body);

    res.redirect("/chess");
  } catch (error) {
    console.log(error);
  }
});

// Edit - to be handled by Front end

//Show - GET one game by its ID
app.get("/chess/:id", async (req, res) => {
  try {
    const chess = await Chess.findById(req.params.id);
    res.json(chess);
  } catch (err) {
    console.log(err);
  }
});

// App.listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
