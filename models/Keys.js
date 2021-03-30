const mongoose = require('mongoose')

const types = [
  "plate",
  "address",
  "schoolId",
  "generic"
]

const keySchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    enum: types,
    default: 'plate'
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
  userId:  String,
  username: String,
  title: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
})

const KeyModel = mongoose.model('Key', keySchema)
module.exports = KeyModel