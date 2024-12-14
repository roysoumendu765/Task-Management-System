const mongoose = require('mongoose');
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bpncd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("DataBase Connection Established");
    } catch (error) {
        console.log(error)
    }
}

connect();

module.exports = connect;