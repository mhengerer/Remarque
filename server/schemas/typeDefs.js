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

  type PlannerItem {
    _id: ID
    body: String
    dayOfCurrentMonth: Int!
  }

  type Spread {
    _id: ID
    monday: String!
    sunday: String!
    plannerItems: [PlannerItem]!
    gridItems: [GridItem]!
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
    spread: [Spread]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addSpread(date: String!, gridItems: [String]): Spread
    updateSpread(_id: ID): Spread
    addGridItem(
      title: String!
      body: String
      i: Int!
      x: Int
      y: Int
      w: Int
      h: Int
      spreadId: ID!
    ): GridItem
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
    addPlannerItem(spreadId: ID!, body: String): PlannerItem
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
