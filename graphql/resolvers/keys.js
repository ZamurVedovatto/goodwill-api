const { AuthenticationError, UserInputError } = require('apollo-server')
const { validateKeyInput } = require('./../../util/validators')
const checkAuth = require('./../../util/check-auth')
const KeyModel = require('./../../models/Keys')
const user = require('../../models/User')

module.exports = {
  Query: {
    async getKeys(_, { userId }) {
      try {
        const keys = await KeyModel.find({ userId })
        return keys
      } catch (error) {
        throw new Error(error)
      }
    },
    async getKey(_, { keyId }) {
      try {
        const key = await KeyModel.findOne( {"_id": keyId })
        if(key) return key
        else throw new Error('Key not found')
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  Mutation: {
    async createKey(_, {
      userId,
      username,
      type,
      value,
      address,
    }, context) {
      const authenticatedUser = checkAuth(context)

      try {
        if(authenticatedUser.id == userId) {
          const { valid, errors } = validateKeyInput(type, value, address)
          if(!valid) {
            throw new UserInputError('Errors', { errors })
          }
          // make sure user doesn't already exists
          const findKey = await KeyModel.findOne({ value })
          if(findKey) {
            throw new UserInputError('Key is taken', {
              errors: {
                key: 'This key is taken'
              }
            })
          }
          const newKey = new KeyModel({
            type,
            userId,
            username,
            value,
            address,
            createdAt: new Date().toISOString()
          })
          return await newKey.save()
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    },

    async deleteKey(_, { keyId }, context) {
      const user = checkAuth(context)
      try {
        const key = await KeyModel.findOne({ "_id": keyId })
        if(user.username == key.username) {
          await key.delete()
          return 'Key deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}