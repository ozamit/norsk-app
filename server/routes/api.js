const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const Category = require('../models/Category');
const Verb = require('../models/Verb');
const Language = require('../models/Language');

// Get all verbs
router.get('/verbs', async (req, res) => {
    try {
        const verbs = await Verb.find();
        res.json(verbs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        // Always fetch Norwegian categories
        const categories = await Category.find({ learningLanguage: 'no' });

        // Transform to object format expected by frontend (original format)
        const categoriesObj = {};
        categories.forEach(cat => {
            categoriesObj[cat.key] = {
                title: cat.title,
                group: cat.group,
                words: cat.words.map(word => ({
                    norwegian: word.word,
                    english: word.translations.en,
                    context: word.context
                }))
            };
        });
        res.json(categoriesObj);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save progress
router.post('/progress', async (req, res) => {
    try {
        const { category, score, totalWords, mastered } = req.body;
        const progress = new UserProgress({
            category,
            score,
            totalWords,
            mastered
        });
        await progress.save();
        res.status(201).json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get progress
router.get('/progress', async (req, res) => {
    try {
        const progress = await UserProgress.find().sort({ timestamp: -1 });
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
