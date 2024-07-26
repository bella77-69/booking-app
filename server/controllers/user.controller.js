const jwt = require("jsonwebtoken");
const {
  verifyUser,
  findUserById,
  createUser,
  getAllUsers,
} = require("../models/user.model");

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send("Authorization header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await verifyUser(email);
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user.user_id, email: user.email }, secretKey, {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const validateUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required." });
    }
    const user = await findUserById(user_id);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }
    res
      .status(200)
      .json({
        message: "User validation successful",
        user: {
          userId: user.user_id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { full_name, username, password, email, phone_number } = req.body;
    const role = "customer";
    const newUser = await createUser(full_name, username, email, password, phone_number, role);
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
    const { user_id } = req.params;
    const user = await findUserById(user_id);
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
