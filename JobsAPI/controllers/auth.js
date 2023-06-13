const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User  = require("../models/user");

const bcrypt = require("bcryptjs");


const register = async (req, res) => {
    const user = await User.create({ ...req.body })

    //const token = jwt.sign({ userId:user._id, name:user.name }, 'jwtSecret', {
    //    expiresIn: "30d"
    //})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ token })
};


const login = async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please Provide Email & Password!!"})
    }

    const user = await User.findOne({email})
    if(!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid Credentials"})
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Incorrect Password!!"})
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
};


const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users })
}


module.exports = {
    register,
    login,
    getUsers,
}