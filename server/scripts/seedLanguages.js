require('dotenv').config();
const mongoose = require('mongoose');
const Language = require('../models/Language');

const languages = [
    {
        code: 'no',
        name: 'Norwegian',
        nativeName: 'Norsk',
        isLearnable: true,
        isInterface: false,
        rtl: false,
    },
    {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        isLearnable: true,
        isInterface: true,
        rtl: false,
    },
    {
        code: 'he',
        name: 'Hebrew',
        nativeName: 'עברית',
        isLearnable: true,
        isInterface: true,
        rtl: true,
    },
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        isLearnable: false,
        isInterface: true,
        rtl: false,
    },
];

async function seedLanguages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Language.deleteMany({});
        console.log('Cleared existing languages');

        await Language.insertMany(languages);
        console.log(`Seeded ${languages.length} languages`);

        mongoose.connection.close();
        console.log('Done!');
    } catch (error) {
        console.error('Error seeding languages:', error);
        process.exit(1);
    }
}

seedLanguages();
