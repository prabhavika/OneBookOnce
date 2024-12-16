const express = require("express");

const genreRouter = express.Router();

const genreController = require("../controllers/genre");

genreRouter.post("/addgenre", genreController.addGenre);
genreRouter.get("/genreslist", genreController.listOfGenres);
module.exports = genreRouter;
