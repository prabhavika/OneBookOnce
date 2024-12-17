const bcrypt = require("bcrypt");
const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");
const { genre } = require("./genreModel");

const bookDetails = sq.define(
  "bookDetails",
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: genre,
        key: "genre_id",
      },
    },
    book_path: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    book_cover_path: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "book_details",
    timestamps: false,
  }
);
// bookDetails.sync();

const createBook = async (
  title,
  author,
  genre_id,
  book_path,
  book_cover_path
) => {
  try {
    const result = await bookDetails.create({
      author: author,
      title: title,
      genre_id: genre_id,
      book_path: book_path,
      book_cover_path: book_cover_path,
    });
    return result;
  } catch (error) {
    console.error("Error in model while uploading the boook:", error);
    throw new Error("Error in model while uploading book");
  }
};

module.exports = { bookDetails, createBook };
