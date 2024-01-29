const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const asyncHandler = require('express-async-handler');
const { populate } = require('../models/userModel');

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    let messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate('sender', 'name pic')
      .populate({
        path: 'chat',
        populate: {
          path: 'users',
          select: 'name pic email',
        },
      });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return sendStatus(400);
  }

  let newMessaage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessaage);

    message = await message.populate('sender', 'name pic').execPopulate();
    message = await message.populate('chat').execPopulate();
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });

    console.log('message : ', message);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
    res.status(200).json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
