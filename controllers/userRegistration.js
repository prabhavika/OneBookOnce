const jwt = require("jsonwebtoken");
const userRegistrationModel = require("../models/userRegistrationModel");

exports.register = async (req, res) => {
  const { username, name, email, password, role = "user" } = req.body;
  console.log("Request Body:", req.body);

  try {
    const existingUser = await userRegistrationModel.getUserByEmail(email);
    if (existingUser) {
      console.log("Email already exists! Please try to login.");
      return res.status(400).json({
        error: "Email already exists! Please try to login.",
      });
    }

    const existingUsername = await userRegistrationModel.getUsername(username);
    if (existingUsername) {
      console.log("Username already exists! Please try another username.");
      return res.status(400).json({
        error: "Username already exists! Please try another username.",
      });
    }

    if (!password || password === "") {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    const hashedPassword = await userRegistrationModel.hashedPassword(password);

    await userRegistrationModel.createUser(
      username,
      name,
      email,
      hashedPassword,
      role
    );

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

    console.log("User registered successfully!");

    return res.status(200).json({
      message: "User registered successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registering user!",
    });
  }
};
