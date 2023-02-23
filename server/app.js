import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import quizRouter from "./routes/quizRouter.js";

dotenv.config();

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, {}).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(200).send("Server is up an running");
});

app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is up and running");
});
