const express = require("express");

const userProfileRouter = express.Router();

const userProfileController = require("../controllers/userProfile");

userProfileRouter.get(
  "/userProfile/:username",
  userProfileController.userProfile
);
userProfileRouter.put(
  "/editUser/:username",
  userProfileController.userProfileEdit
);

module.exports = userProfileRouter;
