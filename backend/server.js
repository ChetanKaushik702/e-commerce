require('dotenv').config({path: 'backend/config/config.env'});
const connectDB = require('./config/database');
const app = require('./app');

// handing uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exceptions');
    process.exit(1);
})

// connecting to database
connectDB();

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