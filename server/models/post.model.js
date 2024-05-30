const db = require('../config/db.config');

const getAllPosts = async () => {
  const [rows] = await db.execute('SELECT * FROM posts');
  return rows;
};

const findPostById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
  if (rows.length === 0) throw new Error('Post not found');
  return rows[0];
};

const addPost = async (post, userId) => {
  const { title, category, content, image } = post;
  await db.execute('INSERT INTO posts (title, category, content, image, userId) VALUES (?, ?, ?, ?, ?)', [title, category, content, image, userId]);
};

const updatePost = async (id, post) => {
  const { title, category, content, image } = post;
  await db.execute('UPDATE posts SET title = ?, category = ?, content = ?, image = ? WHERE id = ?', [title, category, content, image, id]);
};

module.exports = {
  getAllPosts,
  findPostById,
  addPost,
  updatePost,
};
