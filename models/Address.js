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

addressSchema.virtual('id').get(function () {
  return this._id.toString();
});

const addressModel = model('Address', addressSchema, 'Address')
module.exports = { addressModel }