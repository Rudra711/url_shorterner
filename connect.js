const mongoose = require('mongoose');

// Setting mongoose option
mongoose.set("strictQuery", true);

// Function to connect to the database
const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

// Export the connectDb function correctly
module.exports = {
    connectDb,
};
