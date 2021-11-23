require('dotenv').config({path: 'backend/config/config.env'});
const connectDB = require('./config/database');
const app = require('./app');
const cloudinary = require('cloudinary');

// handing uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exceptions');
    process.exit(1);
})

// connecting to database
connectDB();

// cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled rejection');

    server.close(() => {
        process.exit(2);
    });
})