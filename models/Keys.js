const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    default: 'Address'
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
  username: String,
  key: String,
  address: {
    code: String,
    number: String
  },
})

const KeyModel = mongoose.model('Key', keySchema)
module.exports = KeyModel