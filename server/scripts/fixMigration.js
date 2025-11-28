require('dotenv').config();
const mongoose = require('mongoose');

async function fixMigration() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('categories');

        // Get all categories
        const categories = await collection.find({}).toArray();
        console.log(`Found ${categories.length} categories to migrate`);

        for (const cat of categories) {
            // Skip if already migrated
            if (cat.words[0]?.word && cat.words[0]?.translations) {
                console.log(`Skipping ${cat.key} - already migrated`);
                continue;
            }

            // Migrate words
            const updatedWords = cat.words.map(word => ({
                word: word.norwegian || word.word,
                translations: {
                    en: word.english || word.translations?.en,
                    es: word.translations?.es || null,
                    he: word.translations?.he || null
                },
                context: word.context,
                contextTranslations: {
                    en: word.context,
                    es: word.contextTranslations?.es || null,
                    he: word.contextTranslations?.he || null
                }
            }));

            // Update the document
            await collection.updateOne(
                { _id: cat._id },
                {
                    $set: {
                        words: updatedWords,
                        learningLanguage: cat.learningLanguage || 'no'
                    }
                }
            );

            console.log(`Migrated ${cat.key} (${updatedWords.length} words)`);
        }

        console.log('Migration complete!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

fixMigration();
