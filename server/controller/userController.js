import dbConn from "../config/db.config.js";

export const getUserByEmailIdAndPassword = async (
  username,
  password
) => {
  try {
    const [rows, fields] = await dbConn.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      return rows[0]; // Assuming username is unique
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const [rows, fields] = await dbConn.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};