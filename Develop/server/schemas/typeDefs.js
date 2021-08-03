const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addBook(input: BookInput): User
    removeUser: User
    removeBook(bookId: String!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Number
    savedBooks: [Book]
  }

  type Book {
    bookId: Sting
    authors: [String]
    description: String
    title: Sting
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: String!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String!
  }
`;

module.exports = typeDefs;
