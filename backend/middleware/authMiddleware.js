const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET); //will throw TokenExpiredError
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Not authorized, Token has expired');
      } else {
        throw new Error('Internal Server Error');
      }
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
