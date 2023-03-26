const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Notecard {
    _id: ID
    title: String
    body: [String]!
    i: Int 
    x: Int
    y: Int 
    w: Int 
    h: Int 
  }

  type Spread {
    _id: ID
    dates: [Date]
    plannerItems: [String]!
    gridItems: [Notecard]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String 
    spreads: [Spread]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
