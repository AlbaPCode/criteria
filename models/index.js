// models/index.js

const mongoose = require('mongoose');
const { DB_CONNECTION } = require('../config');

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const BusinessUser = require('./BusinessUser');
const Department = require('./Department');
const Employee = require('./Employee');

module.exports = {
    BusinessUser,
    Department,
    Employee
};
