// models/Department.js

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    dName: {
        type: String,
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
