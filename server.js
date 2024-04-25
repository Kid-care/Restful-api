const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute');
const password = require('./routes/password');
const { notFound, errorHandler } = require("./middleware/errors");
const logger = require("./middleware/logger");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const uploud_user = require('./routes/photoRoute');
const profile = require('./routes/profileRoute');
const categoryRoutes =  require("./routes/categoryRouters")
const ItemRoutes =  require("./routes/ItemRouter");
const Owner = require('./routes/ownerRoute');
const AdminCategory = require("./routes/AdminCategory");

dotenv.config();

// express app
const app = express();

// apply Middleware
app.use(express.urlencoded({extended: false}));
app.use(logger);

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors())

app.set('view engine', "ejs");

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use("/password",password);
app.use('/api/v1', uploud_user);
app.use('/api/v1', profile);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/Item", ItemRoutes);
app.use("/api/v1/owner", Owner);
app.use("/api/v1/Admin", AdminCategory);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler)


// dp connection
const database = require('./config/db');
database();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



