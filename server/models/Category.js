const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    translations: {
        en: { type: String, required: true },
        es: { type: String },
        he: { type: String },
    },
    context: {
        type: String,
        required: true,
    },
    contextTranslations: {
        en: { type: String, required: true },
        es: { type: String },
        he: { type: String },
    },
});

const CategorySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    learningLanguage: {
        type: String,
        required: true,
        default: 'no', // Norwegian by default
    },
    words: [WordSchema],
});

module.exports = mongoose.model('Category', CategorySchema);
