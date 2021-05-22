const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

var userModel = mongoose.model('UserCollection', userSchema);

module.exports = userModel;