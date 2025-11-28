require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const { translate } = require('google-translate-api-x');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fixTranslations = async () => {
    console.log('Finding categories with failed translations...');

    const categories = await Category.find({ learningLanguage: 'no' });
    let totalFixed = 0;
    let totalFailed = 0;

    for (const category of categories) {
        let hasFailures = false;
        const updatedWords = [];

        for (const word of category.words) {
            if (word.translations.en === '[Translation Failed]') {
                hasFailures = true;
                totalFailed++;

                // Try to translate again with delay
                try {
                    await sleep(200); // Longer delay to avoid rate limits
                    const res = await translate(word.word, { from: 'no', to: 'en' });

                    updatedWords.push({
                        ...word.toObject(),
                        translations: {
                            en: res.text
                        },
                        contextTranslations: {
                            en: res.text
                        }
                    });

                    totalFixed++;
                    process.stdout.write('.');
                } catch (err) {
                    // Keep the failed translation
                    updatedWords.push(word);
                    process.stdout.write('x');
                }
            } else {
                updatedWords.push(word);
            }
        }

        if (hasFailures) {
            category.words = updatedWords;
            await category.save();
        }
    }

    console.log(`\n\nFixed ${totalFixed} out of ${totalFailed} failed translations`);
    mongoose.connection.close();
};

fixTranslations();
