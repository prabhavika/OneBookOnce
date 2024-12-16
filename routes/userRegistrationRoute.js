const express = require("express");

const registrationRouter = express.Router();

const userRegistration = require("../controllers/userRegistration");

const userLogin = require("../controllers/userLogin");

registrationRouter.post("/register", userRegistration.register);
registrationRouter.post("/login", userLogin.login);

module.exports = registrationRouter;
