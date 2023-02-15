import express from "express";
import { requestValidations, googleAuthController } from "../controllers/authController.js";

const Router = express.Router();

Router.post("/googleAuth", requestValidations, googleAuthController);

export default Router;