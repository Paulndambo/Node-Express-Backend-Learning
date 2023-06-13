const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"],
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            "Please provide a valid email"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"],
        minlength: 3,
        maxlength: 255
    },
    role: {
        type: String,
        default: "individual",
        minlength: 3,
        maxlength: 255
    }
})

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name:this.name}, 'jwtSecret', {expiresIn: '30d'})
}

module.exports = mongoose.model('User', UserSchema)