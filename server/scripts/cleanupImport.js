require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Delete all categories that were imported from CSV (they have _lvl in the key)
        const result = await Category.deleteMany({ key: /_lvl\d+$/ });
        console.log(`Deleted ${result.deletedCount} imported categories`);

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
