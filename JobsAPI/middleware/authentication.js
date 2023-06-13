const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authenticationMiddleware = async (req, res, next) => {
    //check headers
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication Failed!!"})
    }

    const token = authHeader.split(" ")[1]
    console.log(`Token: ${token}`)
    
    try {
        const payload = jwt.verify(token, 'jwtSecret')
        //pass user to job routes
        req.user = {userId: payload.userId, name: payload.name, role: payload.role}
        next()
    
    } catch(error) {
        //console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication Failed!!"})
    }
    
}

module.exports = authenticationMiddleware;