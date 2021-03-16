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
      type,
      address,
      plate
    }, context) {
      const { username } = checkAuth(context)
      const { valid, errors } = validateKeyInput(type, address, plate)
      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }
      // make sure user doesn't already exists

      const findKey = await KeyModel.findOne({ plate })
      if(findKey) {
        throw new UserInputError('Plate is taken', {
          errors: {
            plate: 'This plate is taken'
          }
        })
      }

      address = address ? address : { code : "" }
      plate = plate ? plate : ""
      const newKey = new KeyModel({
        type,
        username,
        address,
        plate,
        createdAt: new Date().toISOString()
      })
      const key = await newKey.save()
      return key
    },

    async deleteKey(_, { keyId }, context) {
      const user = checkAuth(context)
      try {
        console.log(user, keyId)
        const key = await KeyModel.findOne({ "_id": keyId })
        console.log(key)
        if(user.username == key.username) {
          await key.delete()
          return 'Key deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    },
  }
}