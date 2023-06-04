require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//db import
const connectDB =require("./db/connect");

//ROUTE IMPORTS
const productsRouter = require("./routes/products");


//MIDDLEWARE
app.use(express.json())

app.get("/api/v0/home", (req, res) => {
    res.status(200).json({msg: "App is running!!"})
})

app.use("/api/v0/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
        await connectDB(MONGO_URI);

        app.listen(PORT, () => {
            console.log(`Server running on: ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()

