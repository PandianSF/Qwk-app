const { gql } = require('apollo-server')

const typeDefs = gql`

  type User {
    firstName: String!
    email: String!
    gender: String
    city: String
    passWord: String!
  }

  type Query {
    login(email: String!, password: String!): String

  }

  type Mutation {
    updateUser(
      firstName: String
      email: String
      gender: String
      city: String
    ): User
  }  
  `
module.exports = {
  typeDefs,
}