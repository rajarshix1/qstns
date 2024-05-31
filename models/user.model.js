const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: false,
    },
    addedQstnCount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel