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
  socket.on('setup', (userData) => {
    socket.join(userData._id); //now the socket will know all the users by their id so that we can send any information to any user by their id
    console.log('userid setup : ', userData._id);
    socket.emit('connected');
  });
  socket.on('join chat', (room) => {
    socket.join(room); // now socket will know about the chats by having their chat id here | room = chat ids |
    console.log('user joined room: ', room);
  });
  socket.on('new message', (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      console.log('user - ', user);
      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
});
