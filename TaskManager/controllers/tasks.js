const { findByIdAndDelete } = require("../models/Task");
const Task = require("../models/Task");


const getAllTasks = async(req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    }catch(error) {
        res.status(500).json({msg: error})
    }
    
}


const createTask = async(req, res) => {
    try{
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }catch(error){
        res.status(500).json({"msg": "There was an error"})
    }
}

const getSingleTask = async(req, res) => {
    const {id: taskId } = req.params
    try {
        const task = await Task.findById({_id: taskId})
        if(!task) {
            res.status(404).json({"message": `Task with id: ${taskId} not found!`})
        }
        res.status(200).json({task})

    } catch(error) {
        res.status(500).json({msg: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: taskId} = req.params
        const task = await Task.findByIdAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true
        })

        if(!task) {
            return res.status(404).json({"message": `Task with id: ${taskId} not found!`})
        }

        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask = async (req, res) => {
    const {id: taskId } = req.params
    try{
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task) {
            return res.status(404).json({"message": `Task with id: ${taskId} not found!`})
        }
        res.status(204).json({"msg": `Task id: ${taskId} has been deleted successfully!!`})
    } catch(error) {
        res.status(500).json({msg: error})
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}