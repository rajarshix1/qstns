const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    qstn: {
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: false,
    },
    categoryId: [{
        type: mongoose.Types.ObjectId,
        ref:"categories",
        required: true,
    }],
    addedQstnCount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel