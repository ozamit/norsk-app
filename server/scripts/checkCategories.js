require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

async function checkCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const norwegianCats = await Category.find({ learningLanguage: 'no' });
        console.log(`Found ${norwegianCats.length} Norwegian categories`);

        if (norwegianCats.length > 0) {
            const sample = norwegianCats[0];
            console.log('\nSample category:', sample.key);
            console.log('First word:', JSON.stringify(sample.words[0], null, 2));
        }

        const allCats = await Category.find({});
        console.log(`\nTotal categories: ${allCats.length}`);
        allCats.forEach(cat => {
            console.log(`- ${cat.key}: learningLanguage=${cat.learningLanguage}, words=${cat.words.length}`);
        });

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkCategories();
