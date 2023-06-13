require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const mainRouter = require("./routes/main");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json())

app.get("/hello", (req, res) => {
    res.status(200).json({msg: "Hello World!!!"})
});

app.use("/api/v1/", mainRouter);


const start = async () => {
    try {
        //await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on: ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()