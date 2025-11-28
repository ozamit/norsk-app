require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Category = require('../models/Category');

async function updateContexts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const updates = [];

        // Read CSV file
        fs.createReadStream('contexts.csv', { encoding: 'utf8' })
            .pipe(csv())
            .on('data', (row) => {
                const word = row.Ord?.trim();
                const context = row.Setning?.trim();

                if (word && context) {
                    updates.push({ word, context });
                }
            })
            .on('end', async () => {
                console.log(`\nProcessing ${updates.length} words...\n`);

                let successCount = 0;
                let notFoundCount = 0;
                let errorCount = 0;

                for (const { word, context } of updates) {
                    try {
                        // Find all categories that contain this word
                        const categories = await Category.find({
                            'words.word': word
                        });

                        if (categories.length === 0) {
                            console.log(`❌ Word not found: "${word}"`);
                            notFoundCount++;
                            continue;
                        }

                        // Update the context for this word in all categories
                        for (const category of categories) {
                            const wordIndex = category.words.findIndex(w => w.word === word);

                            if (wordIndex !== -1) {
                                category.words[wordIndex].context = context;
                                await category.save();
                                successCount++;
                                console.log(`✅ Updated "${word}" in category: ${category.title}`);
                            }
                        }

                    } catch (error) {
                        console.error(`❌ Error updating "${word}":`, error.message);
                        errorCount++;
                    }
                }

                console.log('\n=== Summary ===');
                console.log(`✅ Successfully updated: ${successCount} word instances`);
                console.log(`❌ Words not found: ${notFoundCount}`);
                console.log(`⚠️  Errors: ${errorCount}`);

                await mongoose.connection.close();
                console.log('\nDatabase connection closed');
            });

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateContexts();
