// userModel.js
const db = require('../config/db.config');

const verifyUser = async (email, password) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  if (rows.length === 0) throw new Error('User not found');
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  if (rows.length === 0) throw new Error('User not found');
  return rows[0];
};

module.exports = {
  verifyUser,
  findUserById,
};
