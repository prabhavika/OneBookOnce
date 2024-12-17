const express = require("express");

const bookRouter = express.Router();

const booksController = require("../controllers/bookDetails");

bookRouter.post("/addbook", booksController.uploadBook);
// bookRouter.get("/bookslist", booksController.);
// bookRouter.put("/editbookdetails/:id", booksController.);
// bookRouter.delete("/deletebook/:id", booksController.);
// bookRouter.delete("/deletebooks", booksController.);
module.exports = bookRouter;
