const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use("/", (req, res) => {
    res.json({message: "working"});
})

app.listen(PORT, () => {
    console.log(`Server is live at port: ${PORT}`);
})