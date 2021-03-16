const { AuthenticationError, UserInputError } = require('apollo-server')
const { validateKeyInput } = require('./../../util/validators')
const checkAuth = require('./../../util/check-auth')
const KeyModel = require('./../../models/Keys')

module.exports = {
  Query: {
    async getKeys() {
      try {
        const keys = await KeyModel.find()
        return keys
      } catch (error) {
        throw new Error(error)
      }
    },
    async getKey(_, { keyId }) {
      try {
        const key = await keyModel.findOne(keyId)
        if(key) return key
        else throw new Error('Key not found')
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  Mutation: {
    async createKey(_, {
      type,
      address,
      plate
    }, context) {
      const { username } = checkAuth(context)
      const { valid, errors } = validateKeyInput(type, address, plate)
      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      address = address ? address : { code : "" }
      plate = plate ? plate : { code: "" }

      const newKey = new KeyModel({
        type,
        username,
        address,
        plate,
        createdAt: new Date().toISOString()
      })
      const key = await newKey.save()
      return key
    }
  }
}