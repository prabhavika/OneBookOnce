// const { UPDATE } = require("sequelize/lib/query-types");

const { userDetails } = require("./userRegistrationModel");

const userProfileDetails = async (username) => {
  try {
    // const data = await pool.query(
    //   `SELECT * FROM user_details WHERE username = $1`,
    //   [username]
    // );
    const data = await userDetails.findAll({
      where: {
        username: username,
      },
    });
    return data;
  } catch (error) {
    throw new Error("User not found!");
  }
};

const userProfilesDetailsEdit = async (username, name, email, password) => {
  try {
    const result = await userDetails.update(
      {
        name,
        email,
        password: password,
      },
      {
        where: {
          username: username,
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Error while editing in model: ", error);
    throw new Error("Error while updating user details!");
  }
};

module.exports = { userProfileDetails, userProfilesDetailsEdit };
