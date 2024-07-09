// const db = require('../config/db.config');
// const bcrypt = require('bcrypt');

// //checked works
// const getAllUsers = async () => {
//   const [rows] = await db.execute('SELECT userId, username, email FROM users');
//   return rows;
// };

// //checked works
// const findUserById = async (userId) => {
//   const [rows] = await db.execute('SELECT userId, username, email FROM users WHERE userId = ?', [userId]);
//   if (rows.length === 0) throw new Error('User not found');
//   return rows[0];
// };


// const verifyUser = async (email) => {
//     const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0) throw new Error('User not found');
//     return rows[0];
//   };

// //checked works
// const registerUser = async (username, password, email, phone) => {
//   const [result] = await db.execute(
//     'INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)',
//     [username, password, email, phone]
//   );
//   return { user_id: result.insertId, username, email, phone };
// };


// //checked works
// const createUser = async (username, email, password) => {
//   // Ensure that all parameters are defined, and if not, handle them appropriately
//   if (username === undefined || email === undefined || password === undefined) {
//     throw new Error('Missing required parameters');
//   }

//   const hashedPassword = await bcrypt.hash(password, 5);
//   const [result] = await db.execute(
//     'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//     [username, email, hashedPassword]
//   );
//   return { id: result.insertId, username, email };
// };


// module.exports = {
//   verifyUser,
//   findUserById,
//   createUser,
//   getAllUsers,
//   registerUser,
// };

// // const db = require('../config/db.config');

// // //checked works
// // const verifyUser = async (email) => {
// //     const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
// //     if (rows.length === 0) throw new Error('User not found');
// //     return rows[0];
// //   };

// // //checked works
// // const findUserById = async (user_id) => {
// //   const [rows] = await db.execute('SELECT user_id, username, email FROM users WHERE user_id = ?', [user_id]);
// //   if (rows.length === 0) throw new Error('User not found');
// //   return rows[0];
// // };


// // const createUser = async (username, password, email, phone) => {
// //   const [result] = await db.execute(
// //     'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)',
// //     [username, password, email, phone]
// //   );
// //   return { user_id: result.insertId, username, email, phone };
// // };

// // //checked works
// // const getAllUsers = async () => {
// //   const [rows] = await db.execute('SELECT user_id, username, email FROM users');
// //   return rows;
// // };

// // //checked works
// // const getUserById = async (user_id) => {
// //   const [rows] = await db.execute('SELECT user_id, username, email FROM users WHERE user_id = ?', [user_id]);
// //   if (rows.length === 0) throw new Error('User not found');
// //   return rows[0];
// // };

// // module.exports = {
// //   verifyUser,
// //   findUserById,
// //   createUser,
// //   getAllUsers,
// //   getUserById,
// // };

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