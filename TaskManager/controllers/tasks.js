const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require("../erros/custom-error");


const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})


const createTask = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})


const getSingleTask = asyncWrapper(async(req, res) => {
    const {id: taskId } = req.params
    const task = await Task.findById({_id: taskId})
    if(!task) {
        //return next(createCustomError(`Task with id: ${taskId} not found!`, 404))
        res.status(404).json({"message": `Task with id: ${taskId} not found!`})
    }
    res.status(200).json({task})
})


const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskId} = req.params
    const task = await Task.findByIdAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if(!task) {
        return next(createCustomError( `Task with id: ${taskId} not found!`, 404))
        //return res.status(404).json({"message": `Task with id: ${taskId} not found!`})
    }
    res.status(201).json({ task })
})


const deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndDelete({_id: taskId})
    if(!task) {
        return res.status(404).json({"message": `Task with id: ${taskId} not found!`})
    }
    res.status(204).json({"msg": `Task id: ${taskId} has been deleted successfully!!`})
})


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}