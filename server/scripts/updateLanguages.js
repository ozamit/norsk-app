require('dotenv').config();
const mongoose = require('mongoose');

async function updateLanguages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('languages');

        // Update Norwegian to be an interface language
        await collection.updateOne(
            { code: 'no' },
            { $set: { isInterface: true } }
        );
        console.log('Updated Norwegian to be an interface language');

        // Hide Spanish and Hebrew for now
        await collection.updateMany(
            { code: { $in: ['es', 'he'] } },
            { $set: { isLearnable: false, isInterface: false } }
        );
        console.log('Hidden Spanish and Hebrew');

        // Verify
        const languages = await collection.find({}).toArray();
        console.log('\nCurrent languages:');
        languages.forEach(lang => {
            console.log(`- ${lang.name}: learnable=${lang.isLearnable}, interface=${lang.isInterface}`);
        });

        mongoose.connection.close();
        console.log('\nDone!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateLanguages();
