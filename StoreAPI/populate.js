require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const JsonProducts = require("./products.json");

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.create(JsonProducts);
    } catch (error) {
        console.log(error)
    }
}

start()