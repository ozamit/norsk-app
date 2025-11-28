require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('✓ Successfully connected to MongoDB!');
        return mongoose.connection.db.admin().listDatabases();
    })
    .then(result => {
        console.log('✓ Databases:', result.databases.map(db => db.name).join(', '));
        return mongoose.connection.close();
    })
    .then(() => {
        console.log('✓ Connection closed');
        process.exit(0);
    })
    .catch(err => {
        console.error('✗ Connection failed:', err.message);
        process.exit(1);
    });
