const jwt = require('jsonwebtoken');
const { getAllPosts, findPostById, addPost: addPostToDb, updatePost: updatePostInDb } = require('../models/post.model');
const { findUserById } = require('../models/user.model');

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send('Header does not exist');
    return '';
  }
  return authHeader.split(' ')[1];
};

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await findPostById(id);
    const user = await findUserById(post.userId);
    res.json({ ...post, email: user.email });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const secretKey = process.env.SECRET_KEY;
    const decodedUser = jwt.verify(token, secretKey);
    const userId = decodedUser.id;
    const incomingPost = req.body;

    if (
      incomingPost.title &&
      incomingPost.category &&
      incomingPost.image &&
      incomingPost.content
    ) {
      await addPostToDb(incomingPost, userId);
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Post data incorrect, try again!!' });
    }
  } catch (error) {
    res.status(401).json({ error: 'You are unauthorized!' });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const incomingPost = req.body;

    const post = await findPostById(id);
    if (!post) {
      res.status(404).json({ error: 'Post not found, try again' });
      return;
    }

    if (
      !incomingPost.title ||
      !incomingPost.category ||
      !incomingPost.content ||
      !incomingPost.image
    ) {
      res.status(400).json({ error: 'Post data incorrect, try again!!' });
      return;
    }

    await updatePostInDb(id, incomingPost);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
};
