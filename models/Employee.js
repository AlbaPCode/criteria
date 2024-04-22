// models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    dName: {
        type: String,
        required: true
    },
    nationalNumber: {
        type: Number,
        required: true,
        unique: true
    },
    fName: {
        type: String,
        required: true
    },
    mName: String,
    lName: {
        type: String,
        required: true
    },
    address: String,
    salary: {
        type: Number,
        required: true
    },
    sex: String,
    bDate: {
        type: Date,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
