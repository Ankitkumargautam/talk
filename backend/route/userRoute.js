const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.route('/register').post(registerUser);

module.exports = router;
