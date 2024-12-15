const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require('../controllers/AuthController');
const {addTask, editTask, deleteTask, getTask, getdashboardData} = require("../controllers/TaskController");

// Auth Routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Task Routes
router.post('/addtask', addTask);
router.post('/deletetask', deleteTask);
router.get('/getalltasks/:username', getTask);
router.get('/getdashdata/:username', getdashboardData);
router.put('/edittask/:taskId', editTask);

module.exports = router;
