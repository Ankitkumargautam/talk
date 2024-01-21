const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.route('/register').post(registerUser);
router.get('/allUser', protect, getAllUser);

module.exports = router;
