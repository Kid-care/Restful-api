const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();


const app = express();

// dp connection
const database = require('./config/db');
database();


app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});