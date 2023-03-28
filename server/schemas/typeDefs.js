const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type GridItem {
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
    monday: String!
    sunday: String!
    plannerItems: [String]!
    gridItems: [GridItem]
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
    user: User
    allUsers: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addSpread(
      date: String!
      plannerItems: [String]
      gridItems: [String]
    ): Spread
    updatePlannerItem(_id: ID!, plannerItems: String!): Spread
    addPlannerItem(plannerItems: String!): Spread
    updateGridItem(
      _id: ID!
      title: String!
      body: [String]!
      i: Int!
      x: Int!
      y: Int!
      w: Int!
      h: Int!
    ): GridItem
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
