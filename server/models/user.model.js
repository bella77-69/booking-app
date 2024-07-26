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
const registerUser = async (full_name, username, password, email, phone_number) => {
  const [result] = await db.execute(
    "INSERT INTO users (full_name, username, password, email, phone_number, role) VALUES (?, ?, ?, ?, ?, ?)",
    [full_name, username, password, email, phone_number, "customer"] // Defaulting to 'customer' for new users
  );

  return { user_id: result.insertId, full_name, username, email, phone_number };
};

const createUser = async (full_name, username, email, password, phone_number, role = "customer") => {
  if (!full_name || !username || !email || !password || !phone_number) {
    throw new Error("Missing required parameters");
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const [result] = await db.execute(
    "INSERT INTO users (full_name, username, email, password, phone_number, role) VALUES (?, ?, ?, ?, ?, ?)",
    [full_name, username, email, hashedPassword, phone_number, role]
  );
  return { id: result.insertId, full_name, username, email, phone_number, role };
};

module.exports = {
  verifyUser,
  findUserById,
  createUser,
  getAllUsers,
  registerUser,
};
