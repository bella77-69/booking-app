const db = require('../config/db.config');

const verifyUser = async (email, password) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length === 0) throw new Error('User not found');
    return rows[0];
  };


const findUserById = async (id) => {
  const [rows] = await db.execute('SELECT id, email FROM users WHERE id = ?', [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const createUser = async (username, email, password) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return { id: result.insertId, username, email };
};

const getAllUsers = async () => {
  const [rows] = await db.execute('SELECT id, username, email FROM users');
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await db.execute('SELECT id, username, email FROM users WHERE id = ?', [id]);
  if (rows.length === 0) throw new Error('User not found');
  return rows[0];
};

module.exports = {
  verifyUser,
  findUserById,
  createUser,
  getAllUsers,
  getUserById,
};
