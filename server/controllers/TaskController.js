const express = require('express');
const {UserTask} = require('../models/TaskModel');
const mongoose = require('mongoose');

const addTask = async (req, res) => {
    const { title, priority, status, startTime, endTime, username } = req.body;
    console.log(req.body);
  
    if (!username) {
      return res.status(400).json({ message: 'No Valid Username' });
    }
  
    if (!title || !priority || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please Fill all the required Fields' });
    }

    const taskStatus = status || 'Pending';
  
    const userTask = new UserTask({
      title,
      priority,
      status: taskStatus,
      startTime,
      endTime,
      username,
    });
  
    try {
      await userTask.save();
      res.status(201).json({ message: 'Task Added Successfully.' });
    } catch (error) {
      console.error('Error saving task:', error);
      res.status(500).json({ message: 'Server error', error });
    }
};  

const getTask = async (req, res) => {
    const username = req.params.username;
    console.log("Fetching tasks for:", username);
    
    try {
        const response = await UserTask.find({ username: username });

        if (!response || response.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        const calculateTotalTime = (start, end) => {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
            return diff || 0;
        };

        const result = [];
        response.forEach((data) => {
            console.log("Task:", data);
            const totalhours = calculateTotalTime(data.startTime, data.endTime);
            result.push({
                "taskId": data.taskId, 
                "title": data.title, 
                "priority": data.priority, 
                "status": data.status, 
                "startTime": data.startTime, 
                "endTime": data.endTime, 
                "totalTime": totalhours
            });
        });

        res.status(200).json({ message: "Data Generated Successfully!", result });
    } catch (error) {
        console.log("Error fetching Tasks:", error.message); // Log error details
        res.status(500).json({ error: "Failed to fetch Data" });
    }
};


const getdashboardData = async (req, res) => {
    const username = req.params.username;
    try {
        const response = await UserTask.find({ username: username });

        if (!response || response.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        const reslen = response.length;
        const pendingtask = response.filter((t) => t.status === "Pending");
        const completedtask = reslen - pendingtask.length;
        const pendingPercent = (pendingtask.length / reslen) * 100;
        const completedPercent = 100 - pendingPercent;

        const completedTask = response.filter((t) => t.status === "Finished");

        const calculateTotalTime = (start, end) => {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
            return diff || 0;
        };

        let totCompletedHours = 0;
        
        completedTask.forEach((item) => {
            const temphour = calculateTotalTime(item.startTime, item.endTime);
            totCompletedHours += temphour;
        });

        const avgTime = Math.floor(totCompletedHours / completedtask); 

        let timeleft = 0;
        let timeElapsed = 0;

        pendingtask.forEach((item) => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
            const totTime = calculateTotalTime(item.startTime, item.endTime);
            const tempElapsedTime = calculateTotalTime(item.startTime, formattedDate);

            timeleft += totTime - tempElapsedTime;
            timeElapsed += tempElapsedTime;
        });

        const prioritydata = response
        .filter(t => t.status === "Pending")
        .reduce((arr, task) => {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          const hours = String(currentDate.getHours()).padStart(2, '0');
          const minutes = String(currentDate.getMinutes()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      
          const totHours = Math.floor(calculateTotalTime(task.startTime, task.endTime));
          const timeElapsed = Math.ceil(calculateTotalTime(task.startTime, formattedDate));
          const timeleft = Math.floor(totHours - timeElapsed);
      
          // Initialize priority if it doesn't exist
          if (!arr[task.priority]) {
            arr[task.priority] = { priority: task.priority, count: 0, timeElapsedSum: 0, timeLeftSum: 0 };
          }
      
          // Aggregate data for each priority
          arr[task.priority].count += 1;
          arr[task.priority].timeElapsedSum += timeElapsed;
          arr[task.priority].timeLeftSum += timeleft;
      
          return arr;
        }, {});
      
      for (let i = 1; i <= 5; i++) {
        if (!prioritydata[i]) {
          prioritydata[i] = { priority: i, count: 0, timeElapsedSum: 0, timeLeftSum: 0 };
        }
      }
      
      const finalPriorityData = Object.values(prioritydata); // Convert object to array
      
      console.log(finalPriorityData);
      

        const dashboardData = {
            "totTasks": reslen,
            "pendingPercent": pendingPercent,
            "completedPercent": completedPercent,
            "AverageTime": avgTime ? avgTime : 0,
            "pendingTasks": pendingtask.length,
            "TimeLapsed": Math.floor(timeElapsed),
            "TimeLeft": Math.floor(timeleft)
        };

        res.status(200).json({ message: "Data Generated Successfully", dashboardData: dashboardData, dashboardTable: finalPriorityData});
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Data not generated" });
    }
};

const deleteTask = async (req, res) => {
    const { taskIds, username } = req.body;  

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
        return res.status(400).send({ error: 'No task IDs provided to delete.' });
    }

    try {
        const response = await UserTask.deleteMany({ taskId: { $in: taskIds }, username: username });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: `${response.deletedCount} tasks deleted successfully` });
        } else {
            res.status(404).send({ error: 'No matching tasks found to be deleted.' });
        }
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).json({ error: 'Failed to delete tasks' });
    }
};

const editTask = async (req, res) => {
    const { taskId } = req.params; 
    const updatedData = req.body; 
    const { username } = updatedData; 

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: 'Invalid Task ID' });
    }

    try {
        const taskObjectId = new mongoose.Types.ObjectId(taskId);

        const updatedTask = await UserTask.findOneAndUpdate(
            { taskId: taskObjectId, username }, 
            { $set: updatedData },
            { new: true }
        );

        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task Not Found or User mismatch' });
        }

    } catch (error) {
        console.error('Error during task update:', error);
        res.status(500).json({ error: 'Failed to update task', details: error.message });
    }
};
  
module.exports = {addTask, getTask, deleteTask, editTask, getdashboardData};