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

  console.log('user: ', user);

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

module.exports = { registerUser };