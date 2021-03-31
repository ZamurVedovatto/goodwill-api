const { AuthenticationError, UserInputError } = require('apollo-server')

const Message = require('./../../models/Message')
const checkAuth = require('./../../util/check-auth')

module.exports = {
  Query: {
    async getMessages () {
      try {
        const messages = await Message.find().sort({ createdAt: -1 })
        return messages
      } catch (err) {
        throw new Error(err)
      }
    },

    async getMessage(_, { messageId }) {
      try{
        const message = await Message.findById(messageId)
        if(message) {
          return message
        } else {
          throw new Error('Message not found')
        }
      } catch(err) {
        throw new Error(err)
      }
    },
  },

  Mutation: {
    async createMessage(_, { body, type, destination }, context) { // TODO change params to msg params
      const user = checkAuth(context)
      if (body.trim() === '') { // change it to validators file
        throw new Error('Message body must not be empty')
      }
      const newMessage = new Message({
        body,
        type,
        destination,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const message = await newMessage.save()
      context.pubsub.publish('NEW_MESSAGE', {
        newMessage: message
      })
      return message
    },


    async deleteMessage(_, { messageId }, context) {
      const user = checkAuth(context)
      try {
        const message = await Message.findById(messageId)
        if(user.username == message.username) {
          await message.delete()
          return 'Message deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch(err) {
        throw new Error(err)
      }
    },

    async likeMessage(_, { messageId }, context) {
      const { username } = checkAuth(context)
      const message = await Message.findById(messageId)
      if(message) {
        if(message.likes.find(like => like.username === username)){
          // message already like, unlike it
          message.likes = message.likes.filter(like => like.username !== username)
        } else {
          // no liked message, do the like
          message.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await message.save()
        return message
      } else {
        throw new UserInputError('Message not found')
      }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_MESSAGE')
    }
  }
}