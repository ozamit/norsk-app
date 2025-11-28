const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalWords: {
        type: Number,
        required: true,
    },
    mastered: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserProgress', UserProgressSchema);
