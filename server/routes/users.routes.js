// userRoutes.js
const express = require('express');
const { loginUser, validateUser } = require('../controllers/user.controller');
const router = express.Router();

router.post('/login', loginUser);
router.post('/validation', validateUser);

module.exports = router;
