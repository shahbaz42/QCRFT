require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

const app = express();

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
