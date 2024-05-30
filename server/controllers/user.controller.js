const jwt = require('jsonwebtoken');
const { verifyUser, findUserById } = require('../models/user.model');

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

module.exports = {
  loginUser,
  validateUser,
};
