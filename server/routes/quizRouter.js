import express from "express";
import { createQuizController, getSubtitleController } from "../controllers/quizController.js";
import { checkAuth } from "../controllers/authController.js";

const Router = express.Router();
Router.get("/getSubtitle", checkAuth, getSubtitleController);
Router.post("/createQuiz", checkAuth, createQuizController);

export default Router;