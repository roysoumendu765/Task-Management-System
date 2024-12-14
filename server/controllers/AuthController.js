const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {LoginUser} = require('../models/AuthModel');
require("dotenv").config();

const registerUser = async(req, res) => {
    const {username, password, confirmpassword} = req.body;

    if(!username || !password || !confirmpassword){
        return res.status(400).json({message: "Please provide all the required fields."});
    }

    if(password != confirmpassword){
        return res.status(400).json({message: "Passwords do not match"});
    }

    const oldUser = await LoginUser.findOne({username});

    if(oldUser){
        return res.status(400).json({message: 'User already exists.'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const addUser = new LoginUser({username, password: hashedPassword});

    try {
        await addUser.save();
        res.status(201).json({message: 'User Registration Successful.'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
}

const loginUser = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: 'Provide valid username and password.'});
    }

    const loggedUser = await LoginUser.findOne({username});
    if(!loggedUser){
        return res.status(400).json({message: 'User not found!'});
    }

    const hashedMatch = await bcrypt.compare(password, loggedUser.password);
    if(!hashedMatch){
        return res.status(400).json({message: 'Invalid Credentials.'});
    }

    const token = jwt.sign({userId: loggedUser._id, username: loggedUser.username}, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({message: 'Login Successful', token});
}

const authMiddleWare = async (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: 'Authorization Denied'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid Token'});
    }
}

module.exports = {registerUser, loginUser, authMiddleWare};