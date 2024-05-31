const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questionCount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel