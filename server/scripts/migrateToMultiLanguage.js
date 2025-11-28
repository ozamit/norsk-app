require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

// Sample Spanish category with translations
const spanishGreetings = {
    key: 'greetings_es',
    title: 'Saludos y Frases',
    group: 'Vocabulario Básico y Vida Diaria',
    learningLanguage: 'es',
    words: [
        {
            word: 'Hola',
            translations: { en: 'Hello', es: 'Hola', he: 'שלום' },
            context: 'Hola, ¿cómo estás?',
            contextTranslations: {
                en: 'Hello, how are you?',
                es: 'Hola, ¿cómo estás?',
                he: 'שלום, מה שלומך?'
            }
        },
        {
            word: 'Adiós',
            translations: { en: 'Goodbye', es: 'Adiós', he: 'להתראות' },
            context: 'Adiós, nos vemos pronto.',
            contextTranslations: {
                en: 'Goodbye, see you soon.',
                es: 'Adiós, nos vemos pronto.',
                he: 'להתראות, נתראה בקרוב.'
            }
        },
        {
            word: 'Gracias',
            translations: { en: 'Thank you', es: 'Gracias', he: 'תודה' },
            context: 'Gracias por tu ayuda.',
            contextTranslations: {
                en: 'Thank you for your help.',
                es: 'Gracias por tu ayuda.',
                he: 'תודה על העזרה שלך.'
            }
        },
        {
            word: 'Por favor',
            translations: { en: 'Please', es: 'Por favor', he: 'בבקשה' },
            context: '¿Puedes ayudarme, por favor?',
            contextTranslations: {
                en: 'Can you help me, please?',
                es: '¿Puedes ayudarme, por favor?',
                he: 'אתה יכול לעזור לי, בבקשה?'
            }
        },
        {
            word: 'Perdón',
            translations: { en: 'Excuse me / Sorry', es: 'Perdón', he: 'סליחה' },
            context: 'Perdón, ¿dónde está el baño?',
            contextTranslations: {
                en: 'Excuse me, where is the bathroom?',
                es: 'Perdón, ¿dónde está el baño?',
                he: 'סליחה, איפה השירותים?'
            }
        }
    ]
};

async function migrateCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all existing categories
        const categories = await Category.find({});
        console.log(`Found ${categories.length} existing categories`);

        // Migrate Norwegian categories to new format
        for (const category of categories) {
            if (!category.learningLanguage) {
                category.learningLanguage = 'no';

                // Convert old format to new format
                const updatedWords = category.words.map(word => ({
                    word: word.norwegian || word.word,
                    translations: {
                        en: word.english || word.translations?.en,
                        es: word.translations?.es || null,
                        he: word.translations?.he || null
                    },
                    context: word.context,
                    contextTranslations: {
                        en: word.context, // Use same context for English for now
                        es: word.contextTranslations?.es || null,
                        he: word.contextTranslations?.he || null
                    }
                }));

                category.words = updatedWords;
                await category.save();
                console.log(`Migrated category: ${category.key}`);
            }
        }

        // Add Spanish greetings category
        const existingSpanish = await Category.findOne({ key: 'greetings_es' });
        if (!existingSpanish) {
            await Category.create(spanishGreetings);
            console.log('Added Spanish greetings category');
        }

        console.log('Migration complete!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

migrateCategories();
