const { format } = require("path/win32");
const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const genre = sq.define(
  "genre",
  {
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
// genre.sync({ alter: true });

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

module.exports = { genre, checkGenre, createGenre, genreList };
