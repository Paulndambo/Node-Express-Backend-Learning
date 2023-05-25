const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty'],
        trim: true,
        maxlength: [255, 'name cannot be longer than 255 characters']
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);