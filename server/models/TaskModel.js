const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
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
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const UserTask = mongoose.model('UserTask', TaskSchema);

module.exports = { UserTask };