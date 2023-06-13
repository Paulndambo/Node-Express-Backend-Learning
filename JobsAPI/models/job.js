const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title cannot be empty"],
        maxlength: 255
    },
    description: {
        type: String,
        required: [true, "Job description cannot be empty"],
        maxlength: 5000
    },
    company: {
        type: String,
        required: [true, "Company cannot be empty"],
        maxlength: 255
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    salary: {
        type: Number,
        required: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'A job must have a user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema)