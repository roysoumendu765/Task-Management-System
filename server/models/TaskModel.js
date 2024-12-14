const mongoose = require('mongoose');
const { LoginUser } = require('./AuthModel');

const TaskSchema = new mongoose.Schema({
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
    totalTimeToFinish: {
        type: Number,
        default: function () {
            if (this.startTime && this.endTime) {
                return (this.endTime - this.startTime) / (1000 * 60 * 60);
            }
            return 0;
        },
    },
    username: {
        type: String,
        required: true,
        ref: 'LoginUser',
    }
});

const UserTask = mongoose.Model("userTask", TaskSchema);