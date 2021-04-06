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
    name: String
    username: String
    email: String
    favoritedKeys: [Key!]
    token: String
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
    senderKey: String!,
    read: Boolean!,
    received: Boolean!,
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
    getUserKeys(userId: ID!): [Key!]
    getUserFavoritedKeys(userId: ID!): [Key!]
    getKeys: [Key!]
    getKey(keyId: ID!): Key!

    getMessages: [Message!]
    getMessage(messageId: ID!): Message!
    getUserReceivedMessages(userId: ID!): [Message!]
    getUserSentMessages(userId: ID!): [Message!]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): LoggedUser!
    editUser(editInput: UserEditInput): User!
    deleteUser(userId: ID!): String!
    favoriteKey(userId: ID!, keyId: ID!): Key!

    # createPost(body: String!, type: String!, destination: String): Post!
    # deletePost(postId: ID!): String!
    # likePost(postId: ID!): Post!
    # createComment(postId: String!, body: String!): Post!
    # deleteComment(postId: ID!, commentId: ID!): Post!
    
    createMessage(modality: String!, targetKey: String!, body: String!, senderKey: String!): Message!
    deleteMessage(messageId: ID!): String!
    likeMessage(messageId: ID!): Message!
    readMessage(messageId: ID!): Message!
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