const { Schema, model } = require('mongoose')

const addressSchema = new Schema({
  code: String,
  street: String,
  number: Number,
  complement: String,
  district: String,
  city: {
    type: String,
    default: 'Belo Horizonte'
  },
  country: {
    type: String,
    default: 'Brasil'
  }
})

const addressModel = model('Address', addressSchema)
module.exports = addressModel