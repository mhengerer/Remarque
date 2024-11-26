const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar ISODate

  type GridItem {
    _id: ID
    title: String
    body: [String]
    i: Int
  }

  type PlannerItem {
    _id: ID
    title: String
    body: String
    scheduled: Int
    status: String
    collections: [ID]
  }

  type Layout {
    _id: ID
    i: String
    x: Int
    y: Int
    w: Int
    h: Int
    minW: Int
    maxW: Int
    minH: Int
    maxH: Int
    card: String
  }

  type Collection {
    _id: ID
    title: String!
    plannerItems: [PlannerItem]
    userId: ID!
  }

  type Spread {
    _id: ID
    monday: String!
    weeklyCollections: [Collection]
    gridItems: [GridItem]!
    layout: [Layout]
    userId: ID!
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    spreads: [Spread]
    collections: [Collection]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    allUsers: [User]
    spread(date: String): Spread
    spreadById(_id: ID): Spread
    userSpreads: [Spread]
  }

  type Mutation {
    addSpread(date: String!): Spread
    addCollection(title: String!): Collection
    updateCollection(_id: ID, title: String): Collection
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
    updateGridItem(_id: ID!, title: String, body: [String], i: Int): GridItem
    addPlannerItem(
      title: String
      body: String
      scheduled: String
      status: String
      collections: [ID]
    ): PlannerItem
    updatePlannerItem(
      _id: ID
      title: String
      body: String
      scheduled: String
      status: String
      collections: [ID]
    ): PlannerItem
    deletePlannerItem(_id: ID!, collectionId: ID): Collection
    deleteCollection(_id: ID!, collectionId: ID): Collection
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
