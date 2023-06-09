const express = require("express");
const app = express();
const PORT = 5000
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI

const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");

//db import
const connectDB =require("./db/connect");

//route imports
const tasks = require("./routes/tasks");


//middleware
app.use(express.json())


//routes
app.get("/hello", (req, res) => {
    res.send("Hello World").status(200)
});

app.use("/api/v1/tasks", tasks)
app.use(notFound);
app.use(errorHandleMiddleware);

const start = async () => {
    try {
        await connectDB(MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
} 

start();