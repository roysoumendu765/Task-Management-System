const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require('../controllers/AuthController');
const {addTask, editTask, deleteTask, getTask} = require("../controllers/TaskController");
const {registerAuth, loginAuth} = require('../middlewares/AuthMiddleware');


// Auth Routes
router.post('/login', loginUser, loginAuth);
router.post('/register', registerUser, registerAuth);

// Task Routes
router.post('/addtask', addTask);
router.delete('/deletetask', deleteTask);
router.get('/getalltasks', getTask);
router.put('/edittask/:id', editTask);
