const jwt = require('jsonwebtoken');
const { verifyUser, findUserById, createUser, getAllUsers } = require('../models/user.model');

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send('Header does not exist');
    return '';
  }
  return authHeader.split(' ')[1];
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await verifyUser(email, password);
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { id: user.id, email: user.email },
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
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const secretKey = process.env.SECRET_KEY;
    const decodedUser = jwt.verify(token, secretKey);
    const user = await findUserById(decodedUser.id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password);
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
    const { id } = req.params;
    const user = await findUserById(id);
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
