require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const authWrapper = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).json({msg: "No authorization token found"})
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const { id, username } = decoded;
        req.user = {id, username}

        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Not authorized to access this route"})
    }
    
}

module.exports = authWrapper