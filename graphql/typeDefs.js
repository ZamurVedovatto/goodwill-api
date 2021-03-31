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
    title: String!
    address: Address
  }
  type LoggedUser {
    user: User!
    keys: [Key]
  }
  # type Post {
  #   id: ID!
  #   body: String!
  #   type: String!
  #   destination: String,
  #   createdAt: String!
  #   comments: [Comment]!
  #   username: String!
  #   likes: [Like]!
  #   likeCount: Int!
  #   commentCount: Int!
  # }
  type Message {
    id: ID!
    modality: String,
    targetKey: String!,
    body: String!,
    senderId: ID!,
    createdAt: String!
    comments: [Comment]!
    commentCount: Int!
    likes: [Like]!
    likeCount: Int!
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
    # getPosts: [Post!]
    # getPost(postId: ID!): Post!
    getUserKeys(userId: String!): [Key!]
    getKeys: [Key!]
    getKey(keyId: ID!): Key!

    getMessages: [Message!]
    getMessage(messageId: ID!): Message!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): LoggedUser!
    editUser(editInput: UserEditInput): User!
    deleteUser(userId: ID!): String!

    # createPost(body: String!, type: String!, destination: String): Post!
    # deletePost(postId: ID!): String!
    # likePost(postId: ID!): Post!
    # createComment(postId: String!, body: String!): Post!
    # deleteComment(postId: ID!, commentId: ID!): Post!
    
    createMessage(modality: String!, targetKey: ID!, body: String!): Message!
    deleteMessage(messageId: ID!): String!
    likeMessage(messageId: ID!): Message!
    createComment(messageId: String!, body: String!): Message!
    deleteComment(messageId: ID!, commentId: ID!): Message!

    createKey(userId: ID!, username: String!, type: String!, title: String, address: AddressInput): Key!
    deleteKey(userId: ID!, keyId: ID!): String!
    toggleActiveKey(userId: ID!, keyId: ID!): Key!
  }
  type Subscription{
    # newPost: Post!
    newMessage: Message!
  }
`

module.exports = typeDefs;