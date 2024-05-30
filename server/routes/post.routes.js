// postRoutes.js
const express = require('express');
const { getPosts, getPostById, createPost, updatePost } = require('../controllers/post.controller');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);

module.exports = router;
