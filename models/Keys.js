const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    default: 'Plate'
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  createdAt: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  username: String,
  value: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
})

const KeyModel = mongoose.model('Key', keySchema)
module.exports = KeyModel