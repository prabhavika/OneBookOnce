const bookDetailsModel = require("../models/bookDetailsModel");

exports.uploadBook = async (req, res) => {
  const { title, author, genre_id, book_path, book_cover_path } = req.body;
  console.log("Request Body: ", req.body);

  try {
  } catch (error) {
    console.error("Error while uploading book: ", error);
    res.status(500).json({
      error: "Database error while upoading the book",
    });
  }
};
