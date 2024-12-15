const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    phone: String!
    role: String!
    otp: Int
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(phone: String!, role: String, otp: Int, isActive: Boolean): User
  }
`;

module.exports = typeDefs;
