require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const manualTranslations = {
    // Level 1
    'jeg': 'I',
    'du': 'you',
    'han': 'he',
    'hun': 'she',
    'vi': 'we',
    'dere': 'you (plural)',
    'de': 'they',
    'mann': 'man',
    'kvinne': 'woman',
    'gutt': 'boy',
    'jente': 'girl',
    'barn': 'child',
    'venn': 'friend',
    'nabo': 'neighbor',
    'lærer': 'teacher',
    'student': 'student',
    'ungdom': 'youth',
    'voksen': 'adult',
    'eldre': 'elderly',

    // Level 2
    'far': 'father',
    'mor': 'mother',
    'bror': 'brother',
    'søster': 'sister',
    'sønn': 'son',
    'datter': 'daughter',
    'bestefar': 'grandfather',
    'bestemor': 'grandmother',
    'onkel': 'uncle',
    'tante': 'aunt',
    'fetter': 'cousin (male)',
    'kusine': 'cousin (female)',
    'foreldre': 'parents',
    'familie': 'family',
    'slektning': 'relative',
    'kone': 'wife',
    'mann': 'husband', // Context dependent, but 'man' is already there. 
    'kjæreste': 'girlfriend/boyfriend',
    'samboer': 'partner (cohabitant)',
    'enke': 'widow'
};

const fixCategory = async () => {
    console.log('Fixing translations manually...');

    // Find categories that might contain these words
    // We'll just search all categories to be safe, or filter by group if we want to be specific
    // Let's search all "no" language categories
    const categories = await Category.find({ learningLanguage: 'no' });

    let totalUpdated = 0;

    for (const category of categories) {
        let updated = false;
        const newWords = category.words.map(word => {
            // Check if we have a manual translation for this word
            // AND if the current translation is failed or missing
            if (manualTranslations[word.word] && (word.translations.en === '[Translation Failed]' || !word.translations.en)) {
                updated = true;
                return {
                    ...word.toObject(),
                    translations: { ...word.translations, en: manualTranslations[word.word] },
                    contextTranslations: { ...word.contextTranslations, en: manualTranslations[word.word] }
                };
            }
            return word;
        });

        if (updated) {
            category.words = newWords;
            await category.save();
            console.log(`Updated ${category.key}`);
            totalUpdated++;
        }
    }

    console.log(`Done! Updated ${totalUpdated} categories.`);
    mongoose.connection.close();
};

fixCategory();
