const express = require('express');
const connectDB = require('./config/db');
const { chats } = require('./data/data');
var colors = require('colors/safe');
const userRoute = require('./route/userRoute');
const chatRoute = require('./route/chatRoute');
const messageRoute = require('./route/messageRoute');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

require('dotenv').config({ path: __dirname + '/.env' });

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

//route
app.use('/api/users', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

//error handling for any error in api
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  // console.log(`Server running on PORT ${PORT}...`)
  console.log(colors.yellow(`Server running on PORT ${PORT}...`))
);

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FrontendUrl,
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
});
