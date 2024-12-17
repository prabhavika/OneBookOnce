const bcrypt = require("bcrypt");
const { userDetails } = require("./userRegistrationModel");
const checkUserEmail = async (email) => {
  try {
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
    console.error("Error: ", error);
    throw new Error("Database error while fetching email");
  }
};

const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) reject("Incorrect Password!");
      resolve(result);
    });
  });
};

module.exports = { checkUserEmail, comparePassword };
