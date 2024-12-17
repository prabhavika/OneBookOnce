const genreModel = require("../models/genreModel");

exports.addGenre = async (req, res) => {
  const { genre } = req.body;
  console.log("request Body: ", req.body);

  try {
    const existingGenre = await genreModel.checkGenre(genre);
    if (existingGenre) {
      console.log("Genre already exists!");
      return res.status(400).json({
        error: "Genre already Exists!",
      });
    }

    await genreModel.createGenre(genre);
    console.log("Genre added successfully!");
    return res.status(200).json({
      message: "Genre added successfully!",
    });
  } catch (error) {
    console.log("Error while uploading Genre: ", error);
    res.status(500).json({
      error: "Database error while adding Genre!",
    });
  }
};

exports.listOfGenres = async (req, res) => {
  try {
    const genresList = await genreModel.genreList();
    res.status(200).json({
      data: genresList,
    });
  } catch (error) {
    console.log("Error while fetching list of genres:", error);
    res.status(500).json({
      error: "Database Error while fetching list of genres!",
    });
  }
};

exports.editGenre = async (req, res) => {
  const { id } = req.params;
  const { genre } = req.body;

  try {
    const result = await genreModel.updateGenres(id, genre);
    res.status(200).json({
      message: "Genre updated successfully!",
      result: result,
    });
  } catch (error) {
    console.error("Error while editing genre: ", error);
    res.status(500).json({
      error: "Database error while editing the genre!",
    });
  }
};

exports.deleteOneGenre = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await genreModel.deletingGenre(id);
    if (result === 0) {
      return res.status(404).json({
        message: "No genre found with the provided id.",
      });
    }
    res.status(200).json({
      message: "Genre deleted successfully!",
    });
  } catch (error) {
    console.error("Error while deleting genre: ", error);
    res.status(500).json({
      error: "Database error while deleting the genre!",
    });
  }
};

exports.deleteAllGenres = async (req, res) => {
  try {
    const result = await genreModel.deletingAllGenres();
    console.log(`${result} rows are deleted!`);
    res.status(200).json({
      message: "Genres deleted successfully!",
    });
  } catch (error) {
    console.error("Error while deleting genres: ", error);
    res.status(500).json({
      error: "Database error while deleting the genres!",
    });
  }
};
