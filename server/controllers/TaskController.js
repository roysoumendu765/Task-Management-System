const express = require('express');
const {UserTask} = require('../models/TaskModel');

const addTask = async (req, res) => {
    const {username, title, priority, status, startTime, endTime} = req.body;

    if(!username){
        return res.status(400).json({message: "No Valid Username"});
    }
    if(!title || !priority || !status || !startTime || !endTime){
        return res.status(400).json({message: "Please Fill all the required Fields"});
    }

    try {
        await UserTask.save(); 
        res.status(201).json({message: 'Task Added Successfully.'});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
};

const getTask = async (req, res) => {
    const {username} = req.body;

    try {
        const response = await UserTask.find({username: username});
        res.status(200).json({message: "Data Generated Successfully!", response});
    } catch (error) {
        console.log("Error fetching Tasks");
        res.status(500).json({error: "Failed to fetch Data"});
    }
};

const deleteTask = async (req, res) => {
    const {taskIds, username} = req.params;

    try {
        const response = await UserTask.deleteMany({taskId: { $in: taskIds }, username: username});

        if(response.deletedCount > 0){
            res.status(200).json({message: `${response.deletedCount} tasks deleted successfully`});
        } else {
            res.status(404).send({error: "No matching tasks found to be deleted."});
        }
    } catch (error) {
        console.error("Error deleting tasks:", error);
        res.status(500).json({error: 'Failed to delete tasks'});
    }
};

const editTask = async (req, res) => {
    const { taskId, username } = req.params;
    const updatedData = req.body;

    try {
        const updatedTask = await UserTask.findOneAndUpdate(
            {taskId, username},
            {$set: updatedData},
            {new : true}
        )

        if(updatedTask){
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({message: 'Task Not Found'});
        }

    } catch (error) {
        console.log('Error updating task: ',error);
        res.status(500).json({error: 'Failed to update task'});
    }
};

module.exports = {addTask, getTask, deleteTask, editTask};