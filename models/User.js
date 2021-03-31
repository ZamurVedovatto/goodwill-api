const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  name: String
})

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

const user = mongoose.model('User', userSchema)
module.exports = user;
