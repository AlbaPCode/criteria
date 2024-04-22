// models/BusinessUser.js

const mongoose = require('mongoose');

const businessUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

const BusinessUser = mongoose.model('BusinessUser', businessUserSchema);

module.exports = BusinessUser;
