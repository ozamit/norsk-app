require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const { translate } = require('google-translate-api-x');
const Category = require('../models/Category');

// Configuration
const CSV_FILE = 'vocabulary.csv';
const DELAY_MS = 100; // Delay between translations to avoid rate limits
const BATCH_SIZE = 10; // Process words in batches

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const processVocabulary = async () => {
    const results = [];

    // Read CSV
    console.log('Reading CSV file...');
    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(`Parsed ${results.length} rows.`);
            await importData(results);
        });
};

const importData = async (rows) => {
    const categoriesMap = {}; // { "Topic": { "Level 1": [words], "Level 2": [words] } }

    console.log('Processing rows...');

    // Iterate through all rows
    for (const row of rows) {
        const level = row['Level'];
        if (!level) continue;

        // Iterate through all columns (Topics)
        for (const [topic, norwegianWord] of Object.entries(row)) {
            if (topic === 'Level' || !norwegianWord || !norwegianWord.trim()) continue;

            if (!categoriesMap[topic]) {
                categoriesMap[topic] = {};
            }
            if (!categoriesMap[topic][level]) {
                categoriesMap[topic][level] = [];
            }

            // Add to processing queue
            categoriesMap[topic][level].push(norwegianWord.trim());
        }
    }

    // Process each category and level
    for (const [topic, levels] of Object.entries(categoriesMap)) {
        console.log(`\nProcessing Topic: ${topic}`);

        for (const [level, words] of Object.entries(levels)) {
            console.log(`  Level ${level}: ${words.length} words`);

            const processedWords = [];

            // Translate words in batches
            for (let i = 0; i < words.length; i += BATCH_SIZE) {
                const batch = words.slice(i, i + BATCH_SIZE);

                // Translate batch
                try {
                    const translations = await Promise.all(
                        batch.map(async (word) => {
                            try {
                                const res = await translate(word, { from: 'no', to: 'en' });
                                return {
                                    word: word,
                                    translations: {
                                        en: res.text
                                    },
                                    context: word, // Use the Norwegian word as context
                                    contextTranslations: {
                                        en: res.text // Same as translation for now
                                    }
                                };
                            } catch (err) {
                                console.error(`    Error translating "${word}":`, err.message);
                                return {
                                    word: word,
                                    translations: {
                                        en: '[Translation Failed]'
                                    },
                                    context: word,
                                    contextTranslations: {
                                        en: '[Translation Failed]'
                                    }
                                };
                            }
                        })
                    );

                    processedWords.push(...translations);
                    process.stdout.write('.'); // Progress indicator
                    await sleep(DELAY_MS); // Rate limit delay

                } catch (err) {
                    console.error('    Batch error:', err.message);
                }
            }

            // Save to Database
            const categoryKey = `${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_lvl${level}`;
            const categoryTitle = `Level ${level}`;

            try {
                await Category.findOneAndUpdate(
                    { key: categoryKey },
                    {
                        key: categoryKey,
                        title: categoryTitle,
                        group: topic,
                        learningLanguage: 'no',
                        words: processedWords
                    },
                    { upsert: true, new: true }
                );
                // console.log(`    Saved ${categoryKey}`);
            } catch (err) {
                console.error(`    Error saving ${categoryKey}:`, err.message);
            }
        }
    }

    console.log('\n\nImport Complete! 🎉');
    mongoose.connection.close();
};

processVocabulary();
