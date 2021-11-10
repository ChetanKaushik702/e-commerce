const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected successfully to ${res.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;