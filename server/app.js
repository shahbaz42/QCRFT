const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/authRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).send("Server is up an running");
});

app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is up and running");
});
