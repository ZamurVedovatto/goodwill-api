const gql = require('graphql-tag')

const typeDefs = gql `
  input RegisterInput {
    username: String!
    password: String!
    name: String!
    confirmPassword: String!
    email: String!
  }
  input UserEditInput {
    id: String
    email: String
    username: String
    name: String
    createdAt: String
  }
  input AddressInput {
    code: String!
    number: String!
    street: String
    complement: String
    district: String
    city: String
    country: String
  }
  type Address {
    code: String
    number: String
    street: String
    complement: String
    district: String
    city: String
    country: String
  }
  type User {
    id: ID!
    email: String
    token: String
    username: String
    name: String
    createdAt: String
  }
  type Key{
    id: ID!
    type: String!
    confirmed: Boolean
    active: Boolean
    createdAt: String
    userId: ID!
    username: String
    value: String!
    address: Address
  }
  type LoggedUser {
    user: User!
    keys: [Key]
  }
  type Post {
    id: ID!
    body: String!
    type: String!
    destination: String,
    createdAt: String!
    comments: [Comment]!
    username: String!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Query {
    getUsers: [User!]
    getUser(userId: ID!): User!
    getPosts: [Post!]
    getPost(postId: ID!): Post!
    getKeys(userId: String!): [Key!]
    getKey(keyId: ID!): Key!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): LoggedUser!
    editUser(editInput: UserEditInput): User!
    deleteUser(userId: ID!): String!

    createPost(body: String!, type: String!, destination: String): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!

    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    
    createKey(userId: ID!, username: String!, type: String!, value: String, address: AddressInput): Key!
    deleteKey(keyId: ID!): String!
  }
  type Subscription{
    newPost: Post!
  }
`

module.exports = typeDefs;