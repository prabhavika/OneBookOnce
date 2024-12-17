const bookDetailsModel = require("../models/bookDetailsModel");
const genreModel = require("../models/genreModel");

exports.uploadBook = async (req, res) => {
  const { title, author, genre, book_path, book_cover_path } = req.body;
  console.log("Request Body: ", req.body);
  const genre_id = await genreModel.getIdOfGenre(genre);
  try {
    await bookDetailsModel.createBook(
      title,
      author,
      genre_id,
      book_path,
      book_cover_path
    );
    res.status(200).json({
      message: "Book added successfully!",
    });
  } catch (error) {
    console.error("Error while uploading book: ", error);
    res.status(500).json({
      error: "Database error while upoading the book",
    });
  }
};
