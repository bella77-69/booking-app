const jwt = require('jsonwebtoken');
const { verifyUser, findUserById, createUser, getAllUsers } = require('../models/user.model');

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send('Authorization header does not exist');
    return '';
  }
  return authHeader.split(' ')[1];
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await verifyUser(email);
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { id: user.userId, email: user.email },
      secretKey,
      {
        expiresIn: '2 days',
      }
    );
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const validateUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Validate the user
    const user = await findUserById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User validation successful', user: { userId: user.userId, username: user.username, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const newUser = await createUser(username, password, email, phone);
    res.status(201).json({ result: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ result: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  validateUser,
  registerUser,
  getUsers,
  getUserById,
};