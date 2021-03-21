const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentResolvers = require('./comments')
const keysResolvers = require('./keys')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) =>  parent.comments.length
  },
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
    ...keysResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...keysResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription,
  }
}