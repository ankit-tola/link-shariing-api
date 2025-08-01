const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', PostSchema);
