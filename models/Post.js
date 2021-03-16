const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
})

const post = mongoose.model('Post', postSchema)
module.exports = post;