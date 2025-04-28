This is a MongoDB application that allows for CRUD operations on the database containing chess games, players, and pieces.

The base routes are /games, /players, and /pieces

All routes have a /seed route which populates sample data. For example, /pieces/seed populates the names and basic information of each chess piece.

Schemas for each route are included in the models folder, which validates data posted to the database.
