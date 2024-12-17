const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const genre = sq.define(
  "genre",
  {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "genre",
    timestamps: false,
  }
);

genre.sync();
const checkGenre = async (genreName) => {
  try {
    const data = await genre.findAll({
      where: {
        genre: genreName,
      },
    });

    if (data && data.length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error while finding genre in model:", error);
    throw new error("Database error while finding genre");
  }
};

const createGenre = async (genreName) => {
  try {
    const result = await genre.create({
      genre: genreName,
    });
    return result;
  } catch (error) {
    console.error("Error while adding genre:", error);
    throw new Error("Error while adding genre");
  }
};

const genreList = async () => {
  try {
    const results = await genre.findAll();
    return results;
  } catch (error) {
    console.log("Error while fetching list of genres", error);
    throw new Error("Error while fetching list of genres!");
  }
};

const updateGenres = async (id, updatedGenre) => {
  try {
    await genre.update(
      {
        genre: updatedGenre,
      },
      {
        where: {
          genre_id: id,
        },
      }
    );
    const updatedEntry = await genre.findOne({
      where: { genre_id: id },
    });
    return updatedEntry;
  } catch (error) {
    console.error("Error while editing genre!", error);
    throw new Error("Error while updating genre");
  }
};

const deletingGenre = async (id) => {
  try {
    const result = await genre.destroy({
      where: { genre_id: id },
    });
    if (result === 0) {
      console.log("No gerne found!");
    } else {
      console.log("Genre deleted successfully!");
    }
    return result;
  } catch (error) {
    console.error("Error while deleting genre in model!", error);
    throw new Error("Error while deleting genre");
  }
};

const deletingAllGenres = async () => {
  try {
    const result = await genre.destroy({
      where: {},
    });
    return result;
  } catch (error) {
    console.error("Error while deleting genre in model!", error);
    throw new Error("Error while deleting genre");
  }
};

const getIdOfGenre = async (genrename) => {
  try {
    const genreId = await genre.findOne({
      where: {
        genre: genrename,
      },
    });
    if (!genreId) {
      return null;
    }
    return genreId.genre_id;
  } catch (error) {
    console.error("Error while fetching the id of genre in model!", error);
    throw new Error("Error while fetching genre's id");
  }
};

module.exports = {
  genre,
  checkGenre,
  createGenre,
  genreList,
  updateGenres,
  deletingGenre,
  deletingAllGenres,
  getIdOfGenre,
};
