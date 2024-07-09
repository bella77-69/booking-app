const db = require('../config/db.config');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  const [rows] = await db.execute('SELECT userId, username, email FROM users');
  return rows;
};

const findUserById = async (userId) => {
  const [rows] = await db.execute('SELECT userId, username, email FROM users WHERE userId = ?', [userId]);
  if (rows.length === 0) throw new Error('User not found');
  return rows[0];
};


const verifyUser = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) throw new Error('User not found');
    return rows[0];
  };

const registerUser = async (username, password, email, phone) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)',
    [username, password, email, phone]
  );
  return { user_id: result.insertId, username, email, phone };
};

const createUser = async (username, email, password) => {
  // Ensure that all parameters are defined, and if not, handle them appropriately
  if (username === undefined || email === undefined || password === undefined) {
    throw new Error('Missing required parameters');
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return { id: result.insertId, username, email };
};


module.exports = {
  verifyUser,
  findUserById,
  createUser,
  getAllUsers,
  registerUser,
};