const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  modality: String,
  targetKey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keys'
  },
  body: String,
  senderKey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keys'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ]
})

const message = mongoose.model('Message', messageSchema)
module.exports = message;
