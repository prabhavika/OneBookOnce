const jwt = require("jsonwebtoken");
const userLoginModel = require("../models/userLoginModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userLoginModel.checkUserEmail(email);
    if (!checkUser) {
      return res.status(400).json({
        error: "User is not registered, please sign up!",
      });
    }
    const isPasswordValid = await userLoginModel.comparePassword(
      password,
      checkUser[0].password
    );
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        message: "Sign in Successful!",
        token: token,
      });
      console.log("Sign in successful!");
    } else {
      return res.status(400).json({
        message: "Incorrect password!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occured while signing in!",
    });
  }
};
