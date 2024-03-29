const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');

const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    throw new Error('Please enter all detail');
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error('User already register');
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(`${name} failed to register!`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please enter all detail');
  }
  const user = await User.findOne({ email });

  try {
    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error(`${user.name} failed to register!`);
    }
  } catch (error) {
    res.status(500);
    throw new Error(
      `${user.name} failed to register! try again with correct credentials`
    );
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.query.search
      ? JSON.parse(req.query.search.trim())
      : '';

    const keyword = searchTerm
      ? {
          $or: [
            { name: { $regex: `^${searchTerm}`, $options: 'i' } },
            { email: { $regex: `^${searchTerm}`, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    return res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
});

module.exports = { registerUser, loginUser, getAllUser };
