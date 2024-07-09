const express = require('express');
const { loginUser, validateUser, registerUser, getUsers, getUserById } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/login', loginUser);
router.post('/validation', validateUser);
router.post('/register', registerUser);

module.exports = router;