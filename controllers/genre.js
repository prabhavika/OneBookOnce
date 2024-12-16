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
    // const data = genresList.map((genre) => genre.get({ plain: true }));
    res.status(200).json({
      success: true,
      data: genresList,
    });
  } catch (error) {
    console.log("Error while fetching list of genres:", error);
    res.status(500).json({
      error: "Database Error while fetching list of genres!",
    });
  }
};
