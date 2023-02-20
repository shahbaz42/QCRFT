import express from "express";
import { createQuizController, getSubtitleController, createQuizFromTextController, createGoogleFormFromQuizJSONController } from "../controllers/quizController.js";
import { checkAuth } from "../controllers/authController.js";

const Router = express.Router();
Router.get("/getSubtitle", checkAuth, getSubtitleController);
Router.post("/createQuiz", checkAuth, createQuizController);
Router.post("/createQuizJSONFromText", checkAuth, createQuizFromTextController);
Router.post("/createGoogleFormFromQuizJSON", checkAuth, createGoogleFormFromQuizJSONController);

export default Router;