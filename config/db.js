const mongoose = require('mongoose');

const database = () => {
    mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => {
        console.log(`DB connected : ${conn.connection.host}`);
    })
    .catch((err) => {
        console.log(`DB connection error : ${err.message , err.stack}`);
    });
};

module.exports = database;