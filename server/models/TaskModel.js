const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: mongoose.Types.ObjectId,  
    },
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    status: {
        type: String,
        enum: ['Pending', 'Finished'],
        default: 'Pending',
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});

const UserTask = mongoose.model("userTask", TaskSchema);

module.exports = {UserTask};