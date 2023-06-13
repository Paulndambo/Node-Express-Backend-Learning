const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const Job = require("../models/job");

const { BadRequestError, NotFoundError } = require("../errors")


const getAllJobs = async (req, res) => {
    const userId = req.user.userId
    console.log(`User Role: ${req.user.role}`)
    const jobs = await Job.find({createdBy: userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getSingleJob = async (req, res) => {
    const { user: {userId}, params: {id:jobId} } = req

    const job = await Job.findOne({ _id: jobId, createdBy: userId })

    if(!job) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "The job you are looking for cannot be found" })
    }

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const { user: {userId}, params: {id:jobId} } = req

    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { 
        new: true,
        runValidators: true
    })

    if(!job) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `Job ID: ${jobId} cannot be found!` })
    }

    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    const { user: {userId}, params: {id:jobId} } = req

    const job = await Job.findByIdAndRemove({
        _id: jobId, createdBy: userId
    })

    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
        //return res.status(StatusCodes.NOT_FOUND).json({ msg: `Job ID: ${jobId} cannot be found!` })
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
}