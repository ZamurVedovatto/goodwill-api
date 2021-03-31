// const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentResolvers = require('./comments')
const keysResolvers = require('./keys')
const messagesResolvers = require('./messages')

module.exports = {
  Message: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) =>  parent.comments.length
  },
  Query: {
    ...usersResolvers.Query,
    // ...postsResolvers.Query,
    ...keysResolvers.Query,
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    // ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...keysResolvers.Mutation,
    ...messagesResolvers.Mutation,
  },
  Subscription: {
    // ...postsResolvers.Subscription,
    ...messagesResolvers.Subscription
  }
}