require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000
const MONGO_URI = process.env.MONGO_URI;

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

//Routers Import
//1. Auth Routers
const authRouter = require("./routes/auth");
//2. Job Routers
const jobsRouter = require("./routes/jobs");

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Jobs API")
})

app.use("/api/v0/auth/", authRouter)
app.use("/api/v0/jobs/", jobsRouter)


app.use(notFoundMiddleware);
app.use(errorMiddleware);


const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server Running on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}
start()