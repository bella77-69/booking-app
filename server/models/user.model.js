const db = require("../config/db.config");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const [rows] = await db.execute("SELECT user_id, username, email FROM users");
  return rows;
};

const findUserById = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT user_id, username, email FROM users WHERE user_id = ?",
    [user_id]
  );
  if (rows.length === 0) throw new Error("User not found");
  return rows[0];
};

const verifyUser = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length === 0) throw new Error("User not found");
  return rows[0];
};

const registerUser = async (username, password, email, phone) => {
  const [result] = await db.execute(
    "INSERT INTO users (username, password, email, phone, role) VALUES (?, ?, ?, ?, ?)",
    [username, password, email, phone, "customer"] // Defaulting to 'customer' for new users
  );

  return { user_id: result.insertId, username, email, phone };
};

const createUser = async (username, email, password, role = "customer") => {
  if (!username || !email || !password) {
    throw new Error("Missing required parameters");
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const [result] = await db.execute(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, hashedPassword, role]
  );
  return { id: result.insertId, username, email, role };
};

module.exports = {
  verifyUser,
  findUserById,
  createUser,
  getAllUsers,
  registerUser,
};
