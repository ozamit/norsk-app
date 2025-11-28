require('dotenv').config();
const mongoose = require('mongoose');

async function cleanupEnglish() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('categories');

        // Delete all English categories (created in the previous step)
        const result = await collection.deleteMany({ learningLanguage: 'en' });
        console.log(`Deleted ${result.deletedCount} English categories`);

        // Reset English language to not be learnable (optional, but good for consistency)
        const langCollection = db.collection('languages');
        await langCollection.updateOne(
            { code: 'en' },
            { $set: { isLearnable: false } }
        );
        console.log('Reset English learnable status');

        mongoose.connection.close();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

cleanupEnglish();
