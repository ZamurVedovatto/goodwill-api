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
  plate: String,
  address: {
    code: String,
    street: String,
    number: String,
    complement: String,
    district: String,
    state: String,
    city: {
      type: String,
      default: 'Belo Horizonte'
    },
    country: {
      type: String,
      default: 'Brasil'
    }
  },
})

const KeyModel = mongoose.model('Key', keySchema)
module.exports = KeyModel