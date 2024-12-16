const bcrypt = require("bcrypt");
const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const userDetails = sq.define(
  "userDetails",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_details",
    timestamps: false,
  }
);

const getUserByEmail = async (email) => {
  try {
    // const data = await pool.query(
    //   `SELECt * FROM user_details WHERE email = $1;`,
    //   [email]
    // );
    const data = await userDetails.findAll({
      where: {
        email: email,
      },
    });
    if (data && data.length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching email:", error);
    throw new Error("Database error while fetching email!");
  }
};

const getUsername = async (username) => {
  try {
    // const usernamedata = await pool.query(
    //   `SELECT * FROM user_details WHERE username = $1;`,
    //   [username]
    // );
    // return usernamedata.rows;
    const usernamedata = await userDetails.findAll({
      where: {
        username: username,
      },
    });
    if (usernamedata && usernamedata.length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Database error while fetching username!");
  }
};

const createUser = async (username, name, email, hashedPassword, role) => {
  try {
    // const result = await pool.query(
    //   `INSERT INTO user_details (username, name, email, password, role) VALUES ($1, $2, $3, $4, $5);`,
    //   [username, name, email, hashedPassword, role]
    // );
    // return result;
    const result = await userDetails.create({
      username,
      name,
      email,
      password: hashedPassword,
      role,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating user!");
  }
};

const hashedPassword = async (password) => {
  if (!password || password === "") {
    throw new Error("Password is empty or undefined");
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.error("Error during hashing password", err);
    throw new Error("Error hashing password");
  }
};

module.exports = {
  getUserByEmail,
  getUsername,
  createUser,
  hashedPassword,
  userDetails,
};
