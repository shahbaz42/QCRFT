const express = require("express");
const authController = require("../controllers/authController");
const Router = express.Router();

Router.post("/googleAuth",authController.requestValidations, authController.googleAuthController);

module.exports = Router;