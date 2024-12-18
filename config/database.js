const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://NamasteNode:9|00CDQz&ow)@learnmongodb.phqr2.mongodb.net/devTinder');
};

module.exports = connectDB;