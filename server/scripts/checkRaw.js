require('dotenv').config();
const mongoose = require('mongoose');

async function checkRaw() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection.db;
        const collection = db.collection('categories');

        const sample = await collection.findOne({ key: 'greetings' });
        console.log('Raw document:', JSON.stringify(sample, null, 2).substring(0, 800));

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkRaw();
