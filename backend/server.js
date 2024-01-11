const express = require('express');
const { chats } = require('./data/data');
require('dotenv').config({ path: __dirname + '/.env' });
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
  console.log(`Server running on PORT ${PORT}...`)
  // console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
