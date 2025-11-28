const mongoose = require('mongoose');

const verbSchema = new mongoose.Schema({
    infinitive: { type: String, required: true, unique: true }, // e.g., "å spise"
    translation: { type: String, required: true }, // e.g., "to eat"
    forms: {
        present: { type: String, required: true }, // spiser
        past: { type: String, required: true }, // spiste
        perfect: { type: String, required: true }, // har spist
        pluperfect: { type: String, required: true }, // hadde spist
        future: { type: String, required: true }, // skal spise
        imperative: { type: String, required: true } // spis
    },
    // Complete sentence pairs for translation practice
    sentences: [{
        english: { type: String, required: true }, // "I eat breakfast now"
        norwegian: { type: String, required: true }, // "Jeg spiser frokosten nå"
        tense: { type: String, required: true } // present, past, perfect, pluperfect, future, imperative
    }]
});

module.exports = mongoose.model('Verb', verbSchema);
