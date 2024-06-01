const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questionCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel