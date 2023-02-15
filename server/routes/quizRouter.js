import express from "express";
import { createQuizController } from "../controllers/quizController.js";
import { checkAuth } from "../controllers/authController.js";

const Router = express.Router();
Router.post("/createQuiz", checkAuth, createQuizController);

export default Router;