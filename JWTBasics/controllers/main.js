require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET //"myJWTSecret"

const login = async(req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide username and password!!"})
    }
    
    const id = new Date().getDate() 
    const token = jwt.sign({id, username}, JWT_SECRET, {expiresIn: '30d'})

    res.status(StatusCodes.CREATED).json({msg: "user created", token })
}


const dashboard = async (req, res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(StatusCodes.OK).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Your lucky number is: ${luckyNumber}`
    })  
}


module.exports = {
    login,
    dashboard
}