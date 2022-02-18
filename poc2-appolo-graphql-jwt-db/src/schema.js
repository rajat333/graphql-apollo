const { gql } = require('apollo-server-express');

module.exports = gql`
   interface Error {
    message: String!
   }
    union BookResult = Book | BookNotFoundError

    type Query {
        hello: String,
        books: [Book]!,
        book(id: ID!): BookResult
    }

    type Book {
        id: ID!
        title: String!
        author: User
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
    }

    type BookNotFoundError implements Error {
        message: String!
    }
    type CountryBlockedError implements Error {
        message: String!
    }
    type Mutation {
        addBook(title: String!, description: String!): Book!
        updateBook(id: ID!, title: String!, description: String!): Book!
        deleteBook(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!

    }
`;
