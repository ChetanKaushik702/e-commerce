require('dotenv').config({path: 'backend/config/config.env'});
const connectDB = require('./config/database');
const app = require('./app');

// connecting to database
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})