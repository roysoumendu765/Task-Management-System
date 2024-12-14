const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DB = require('./conn/connection');
const routes = require('./routes/routes');
const {authMiddleWare} = require("./controllers/AuthController");
require('dotenv').config();
// DB();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})


app.use('/taskmate', routes);
// app.use(authMiddleWare);

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is live at port: ${PORT}`);
})