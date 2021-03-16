const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { AuthenticationError, UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('./../../util/validators')
const { SECRET_KEY } = require('./../../config')
const User = require('./../../models/User')
const KeyModel = require('./../../models/Keys')
const checkAuth = require('./../../util/check-auth')

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email,
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Query: {
    async getUsers () {
      try {
        const users = await User.find().sort({ createdAt: -1 })
        return users
      } catch (err) {
        throw new Error(err)
      }
    },

    async getUser(_, { userId }) {
      try{
        const user = await User.findById(userId)
        if(user) {
          return user
        } else {
          throw new Error('User not found')
        }
      } catch(err) {
        throw new Error(err)
      }
    },
  },


  Mutation: {
    // REGISTER MUTATION
    async register(_, { registerInput: { username, email, password, confirmPassword }}) {
      // validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }
      // make sure user doesn't already exists
      const userByEmail = await User.findOne({ email })
      if(userByEmail) {
        throw new UserInputError('Email is taken', {
          errors: {
            username: 'This email is taken'
          }
        })
      }
      const user = await User.findOne({ username })
      if(user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      // hash password and create auth token
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      })
      const result = await newUser.save()
      const token = generateToken(result)
      return {
        ...result._doc,
        id: result._id,
        token
      }
    },

    // LOGIN MUTATION
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password)
      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ username })
      if(!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if(!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors })
      }
      const keys = await KeyModel.find({ "username": user.username })
      console.log(keys)
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        keys,
        token
      }
    },

    // DELETE USER MUTATION
    async deleteUser(_, { userId }, context) {
      const authenticatedUser = checkAuth(context)
      try {
        const user = await User.findById(userId)
        if(authenticatedUser.username == user.username) {
          await user.delete()
          return 'User deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    },
  }
}