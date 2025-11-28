require('dotenv').config();
const mongoose = require('mongoose');

async function createEnglishCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('categories');

        // Get all Norwegian categories
        const norwegianCats = await collection.find({ learningLanguage: 'no' }).toArray();
        console.log(`Found ${norwegianCats.length} Norwegian categories`);

        const englishCategories = [];

        for (const noCat of norwegianCats) {
            // Create English version by flipping word and translation
            const englishWords = noCat.words.map(word => ({
                word: word.translations.en,
                translations: {
                    no: word.word,
                    en: word.translations.en,
                    es: word.translations.es || null,
                    he: word.translations.he || null
                },
                context: word.contextTranslations.en,
                contextTranslations: {
                    no: word.context,
                    en: word.contextTranslations.en,
                    es: word.contextTranslations.es || null,
                    he: word.contextTranslations.he || null
                }
            }));

            const englishCat = {
                key: noCat.key + '_en',
                title: noCat.title, // Keep English title for now
                group: noCat.group,
                learningLanguage: 'en',
                words: englishWords
            };

            englishCategories.push(englishCat);
        }

        // Insert English categories
        if (englishCategories.length > 0) {
            // Remove existing English categories first
            await collection.deleteMany({ learningLanguage: 'en', key: { $regex: /_en$/ } });

            await collection.insertMany(englishCategories);
            console.log(`Created ${englishCategories.length} English categories`);
        }

        // Update English language to be learnable
        const langCollection = db.collection('languages');
        await langCollection.updateOne(
            { code: 'en' },
            { $set: { isLearnable: true } }
        );
        console.log('Updated English to be learnable');

        mongoose.connection.close();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createEnglishCategories();
