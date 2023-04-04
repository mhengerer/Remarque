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

export const UPDATE_GRIDITEM = gql`
  mutation UpdateGridItem($id: ID!, $title: String, $body: [String]) {
    updateGridItem(_id: $id, title: $title, body: $body) {
      _id
    }
  }
`;

export const UPDATE_PLANNERITEM = gql`
  mutation UpdatePlannerItem($id: ID, $body: String) {
    updatePlannerItem(_id: $id, body: $body) {
      _id
      body
      dayOfCurrentWeek
    }
  }
`;
