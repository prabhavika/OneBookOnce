const userProfileModel = require("../models/userProfileModel");
const userRegistrationModel = require("../models/userRegistrationModel");

exports.userProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const profileDetails = await userProfileModel.userProfileDetails(username);
    if (profileDetails.length > 0) {
      res.status(200).json(profileDetails[0]);
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  } catch (err) {
    console.error("Error while fetching from dataabse:", err);
    res.status(500).json({
      error: "Database error occured while fetching user profile!",
    });
  }
};

exports.userProfileEdit = async (req, res) => {
  const { username } = req.params;
  const { name, email, password } = req.body;
  const hashedPassword = await userRegistrationModel.hashedPassword(password);

  try {
    const existingProfile = await userProfileModel.userProfileDetails(username);
    if (existingProfile.length > 0) {
      await userProfileModel.userProfilesDetailsEdit(
        username,
        name,
        email,
        hashedPassword
      );
      res.status(200).json({
        message: "User profile updates successfully!",
      });
    } else {
      res.status(404).json({
        message: " user not found!",
      });
    }
  } catch (error) {
    console.error("Error while editing user profile: ", error);
    res.status(500).json({
      error: "Database error occured while editing user profile!",
    });
  }
};
