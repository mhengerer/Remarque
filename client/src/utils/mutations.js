import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SPREAD = gql`
  mutation addSpread($date: String!) {
    addSpread(date: $date) {
      _id
      monday
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection($title: String!) {
    addCollection(title: $title) {
      _id
      title
    }
  }
`;

export const ADD_PLANNERITEM = gql`
  mutation addPlannerItem(
    $title: String!
    $body: String
    $scheduled: String
    $status: String
    $collections: [ID]
  ) {
    addPlannerItem(
      title: $title
      body: $body
      scheduled: $scheduled
      status: $status
      collections: $collections
    ) {
      _id
      title
    }
  }
`;

export const UPDATE_GRIDITEM = gql`
  mutation updateGridItem($id: ID!, $title: String, $body: [String]) {
    updateGridItem(_id: $id, title: $title, body: $body) {
      _id
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation updateCollection($id: ID!, $title: String) {
    updateCollection(_id: $id, title: $title) {
      _id
      title
    }
  }
`;

export const UPDATE_PLANNERITEM = gql`
  mutation updatePlannerItem(
    $_id: ID!
    $title: String
    $body: String
    $scheduled: String
    $status: String
    $collections: [ID]
  ) {
    updatePlannerItem(
      _id: $_id
      title: $title
      body: $body
      scheduled: $scheduled
      status: $status
      collections: $collections
    ) {
      _id
      title
    }
  }
`;

export const DELETE_PLANNERITEM = gql`
  mutation DeletePlannerItem($_id: ID!, $collectionId: ID) {
    deletePlannerItem(_id: $_id, collectionId: $collectionId) {
      _id
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation DeleteCollection($_id: ID!, $collectionId: ID) {
    deleteCollection(_id: $_id, collectionId: $collectionId) {
      _id
      title
    }
  }
`;
