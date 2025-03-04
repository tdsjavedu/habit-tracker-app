import mongoose from 'mongoose';
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected');
}).catch(() => {
    console.log('Error Connecting to Database');
    console.log(err);
});

module.exports = mongoose;

