import express from "express";
import { requestValidations, googleAuthController, checkAuth, getProfileController } from "../controllers/authController.js";

const Router = express.Router();

Router.post("/googleAuth", requestValidations, googleAuthController);
Router.get("/profile", checkAuth, getProfileController);

export default Router;