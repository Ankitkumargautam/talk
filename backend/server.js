const express = require('express');
const connectDB = require('./config/db');
const { chats } = require('./data/data');
var colors = require('colors/safe');

require('dotenv').config({ path: __dirname + '/.env' });

connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('Application started');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  // console.log(`Server running on PORT ${PORT}...`)
  console.log(colors.yellow(`Server running on PORT ${PORT}...`))
);
