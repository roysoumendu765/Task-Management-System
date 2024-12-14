const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require('../controllers/AuthController');
const {addTask, editTask, deleteTask, getTask} = require("../controllers/TaskController");

// Auth Routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Task Routes
router.post('/addtask', addTask);
router.delete('/deletetask/:taskId/:username', deleteTask);
router.get('/getalltasks', getTask);
router.patch('/edittask/:taskId/:username', editTask);

module.exports = router;
