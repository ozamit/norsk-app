const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    nativeName: {
        type: String,
        required: true,
    },
    isLearnable: {
        type: Boolean,
        default: true,
    },
    isInterface: {
        type: Boolean,
        default: true,
    },
    rtl: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Language', LanguageSchema);
