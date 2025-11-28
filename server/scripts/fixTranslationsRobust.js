require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const { translate } = require('google-translate-api-x');

// Configuration
const BATCH_SIZE = 1; // Process 1 word at a time to be safe
const DELAY_MS = 2000; // 2 seconds delay between words

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fixTranslationsRobust = async () => {
    console.log('Starting robust translation fix...');

    // Find all categories with failed translations
    const categories = await Category.find({
        learningLanguage: 'no',
        'words.translations.en': '[Translation Failed]'
    });

    console.log(`Found ${categories.length} categories with failed translations.`);

    let totalFixed = 0;

    for (const category of categories) {
        console.log(`Processing ${category.key}...`);
        let updated = false;
        const newWords = [];

        for (const word of category.words) {
            if (word.translations.en === '[Translation Failed]') {
                try {
                    // Translate
                    const res = await translate(word.word, { from: 'no', to: 'en' });

                    newWords.push({
                        ...word.toObject(),
                        translations: { ...word.translations, en: res.text },
                        contextTranslations: { ...word.contextTranslations, en: res.text }
                    });

                    updated = true;
                    totalFixed++;
                    process.stdout.write('.'); // Progress indicator

                    // Wait to avoid rate limits
                    await sleep(DELAY_MS);

                } catch (err) {
                    console.error(`\nError translating "${word.word}": ${err.message}`);
                    // Keep failed translation for now, try next time
                    newWords.push(word);
                    // Wait even longer on error
                    await sleep(DELAY_MS * 2);
                }
            } else {
                newWords.push(word);
            }
        }

        if (updated) {
            category.words = newWords;
            await category.save();
            console.log(`\nSaved ${category.key}`);
        }
    }

    console.log(`\n\nRobust fix complete! Fixed ${totalFixed} words.`);
    mongoose.connection.close();
};

fixTranslationsRobust();
