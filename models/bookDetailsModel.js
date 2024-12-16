const bcrypt = require("bcrypt");
const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const bookDetails = sq.define(
  "bookDetails",
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_path: {
      type: DataTypes.CHAR,
      unique: true,
      allowNull: false,
    },
    book_cover_path: {
      type: DataTypes.CHAR,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: books,
    timestamps: false,
  }
);
bookDetails.sync({ alter: true });
