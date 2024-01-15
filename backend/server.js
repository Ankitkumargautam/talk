const express = require('express');
const connectDB = require('./config/db');
const { chats } = require('./data/data');
var colors = require('colors/safe');
const userRoute = require('./route/userRoute');
const { errorHandler } = require('./middleware/errorMiddleware');

require('dotenv').config({ path: __dirname + '/.env' });

connectDB();
const app = express();

app.use(express.json());

app.use('/api/users', userRoute);

//error handling for any error in api
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  // console.log(`Server running on PORT ${PORT}...`)
  console.log(colors.yellow(`Server running on PORT ${PORT}...`))
);
