const express = require("express");

const genreRouter = express.Router();

const genreController = require("../controllers/genre");

genreRouter.post("/addgenre", genreController.addGenre);
genreRouter.get("/genreslist", genreController.listOfGenres);
genreRouter.put("/editGenre/:id", genreController.editGenre);
genreRouter.delete("/deletegenre/:id", genreController.deleteOneGenre);
genreRouter.delete("/deletegenres", genreController.deleteAllGenres);
module.exports = genreRouter;
