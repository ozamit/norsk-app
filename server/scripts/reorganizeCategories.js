require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

// New category organization structure
const categoryMapping = {
    // Main Categories
    "Basic Communication": [
        "Greetings & Phrases",
        "Personal Information",
        "Question Words",
        "Verbs",
        "Communication",
        "Emotions & Feelings"
    ],
    "People and Relationships": [
        "Family & People",
        "Jobs & Professions"
    ],
    "Home and Daily Life": [
        "Home & Furniture",
        "Bathroom Items",
        "Bedroom Items",
        "Kitchen Items",
        "Cleaning Supplies",
        "Household Chores",
        "Common Objects",
        "Tools"
    ],
    "Body and Clothing": [
        "Body & Health",
        "Clothing"
    ],
    "Time, Dates & Numbers": [
        "Time & Dates",
        "Numbers"
    ],
    "Colors, Shapes & Descriptions": [
        "Colors",
        "Shapes",
        "Basic Adjectives",
        "Frequency & Quantity"
    ],
    "Food and Drink": [
        "Food & Drink",
        "Fruits",
        "Vegetables",
        "Drinks"
    ],
    "Animals & Pets": [
        "Animals",
        "Pets"
    ],
    "Places, Directions & Transportation": [
        "Places & Directions",
        "Transportation & Vehicles",
        "Travel & Tourism"
    ],
    "Nature & Weather": [
        "Weather & Nature",
        "Weather & Seasons"
    ],
    "Education, Hobbies & Activities": [
        "School & Education",
        "Sports & Activities",
        "Hobbies & Leisure",
        "Outdoor Activities"
    ],
    "Shopping & Money": [
        "Shopping",
        "Money & Banking"
    ],
    "Technology & Culture": [
        "Technology & Devices",
        "Cultural Items"
    ],

    // Level 2 Categories
    "Level 2: Basic Communication": [
        "Greetings (L2)",
        "Personal Info (L2)",
        "Questions (L2)",
        "Verbs (L2)",
        "Communication (Level 2)",
        "Emotions (Level 2)"
    ],
    "Level 2: People and Relationships": [
        "Family (L2)",
        "Jobs (Level 2)"
    ],
    "Level 2: Home and Daily Life": [
        "Home (L2)",
        "Bathroom (Level 2)",
        "Bedroom (Level 2)",
        "Kitchen (Level 2)",
        "Cleaning (Level 2)",
        "Chores (Level 2)",
        "Objects (L2)",
        "Tools (Level 2)"
    ],
    "Level 2: Body and Clothing": [
        "Body & Health (L2)",
        "Clothing (L2)"
    ],
    "Level 2: Time, Dates & Numbers": [
        "Time (L2)",
        "Numbers (L2)"
    ],
    "Level 2: Colors, Shapes & Descriptions": [
        "Colors (L2)",
        "Shapes (Level 2)",
        "Adjectives (L2)",
        "Frequency (L2)"
    ],
    "Level 2: Food and Drink": [
        "Food (L2)",
        "Fruits (Level 2)",
        "Vegetables (Level 2)",
        "Drinks (Level 2)"
    ],
    "Level 2: Animals & Pets": [
        "Nature (L2)",
        "Pets (Level 2)"
    ],
    "Level 2: Places, Directions & Transportation": [
        "Places (L2)",
        "Transportation (Level 2)",
        "Travel (Level 2)"
    ],
    "Level 2: Nature & Weather": [
        "Weather (Level 2)"
    ],
    "Level 2: Education, Hobbies & Activities": [
        "School (Level 2)",
        "Sports (Level 2)",
        "Hobbies (Level 2)",
        "Outdoor (Level 2)"
    ],
    "Level 2: Shopping & Money": [
        "Shopping (Level 2)",
        "Money (Level 2)"
    ],
    "Level 2: Technology & Culture": [
        "Technology (Level 2)",
        "Culture (Level 2)"
    ]
};

async function reorganizeCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let updatedCount = 0;
        let notFoundCount = 0;

        // Iterate through each group and its categories
        for (const [newGroup, categoryTitles] of Object.entries(categoryMapping)) {
            console.log(`\nProcessing group: ${newGroup}`);

            for (const title of categoryTitles) {
                const result = await Category.updateOne(
                    { title: title },
                    { $set: { group: newGroup } }
                );

                if (result.matchedCount > 0) {
                    console.log(`  ✓ Updated: ${title}`);
                    updatedCount++;
                } else {
                    console.log(`  ✗ Not found: ${title}`);
                    notFoundCount++;
                }
            }
        }

        console.log(`\n=== Summary ===`);
        console.log(`Updated: ${updatedCount} categories`);
        console.log(`Not found: ${notFoundCount} categories`);

        mongoose.connection.close();
        console.log('\nDone!');
    } catch (error) {
        console.error('Error reorganizing categories:', error);
        process.exit(1);
    }
}

reorganizeCategories();
