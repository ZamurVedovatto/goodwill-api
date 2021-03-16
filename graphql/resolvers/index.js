const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const keysResolvers = require('./keys')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length
  },
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
    ...keysResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...keysResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription,
  }
}