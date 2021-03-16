const gql = require('graphql-tag')

const typeDefs = gql `
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input Address {
    code: String
    street: String
    number: String
    complement: String
    district: String
    city: String
    country: String
  }
  input Plate {
    code: String
    city: String
    state: String
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Key{
    id: ID!
    type: String!
    confirmed: Boolean
    active: Boolean
    createdAt: String
    username: String
    address: String
    plate: String
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    likes: [Like]!
    likeCount: Int!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
    getKeys: [Key]
    getKey(keyId: ID!): Key
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    deleteUser(userId: ID!): String!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!

    createKey(type: String!, plate: String): Key!
    deleteKey(keyId: ID!): String!
  }
  type Subscription{
    newPost: Post!
  }
`

module.exports = typeDefs;