const express = require('express');

// error middleware
const errorMiddleware = require('./middlerware/error');

const app = express(); 

app.use(express.json());

// routes
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);

app.use(errorMiddleware);

module.exports = app;