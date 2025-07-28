const Post = require('../models/Post');
const scrapeMetadata = require('../utils/scraper'); // This is correct for module.exports = scrapeMetadata

exports.createPost = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ msg: 'URL is required' });
  }

  try {
    const metadata = await scrapeMetadata(url);
    const post = new Post({
      url,
      ...metadata,
      user: req.user.id
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ votes: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching posts' });
  }
};

exports.votePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    post.votes += 1;
    await post.save();

    // ✅ Emit updated vote count to all clients via Socket.io
    req.io.emit('updateVote', {
      postId: post._id,
      votes: post.votes
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Error voting post' });
  }
};

