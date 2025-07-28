const express = require('express');
const router = express.Router();
const { createPost, getPosts, votePost } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.put('/vote/:id', auth, votePost);

module.exports = router;
