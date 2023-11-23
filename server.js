const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute');
dotenv.config();

// express app
const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter);

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