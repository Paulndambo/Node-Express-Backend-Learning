const mongoose = require("mongoose");

//const connectionString = "mongodb+srv://kadabo:1234@nodeexpressprojects.oghfjs8.mongodb.net/TaskManager?retryWrites=true&w=majority"

const connectDB = (MONGO_URI) => {
    mongoose.connect(MONGO_URI).then(() => console.log("Database Connected!!!"))
}

module.exports = connectDB;