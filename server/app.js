require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");

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

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is up and running");
});
