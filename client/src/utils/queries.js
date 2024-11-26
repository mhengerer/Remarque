import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User {
    user {
      _id
      username
      email
      password
      spreads {
        _id
        monday
        weeklyCollections {
          _id
          title
          userId
          plannerItems {
            _id
            title
            body
            scheduled
            status
            collections
          }
        }
        userId
      }
      collections {
        _id
        title
        plannerItems {
          _id
          title
          body
          scheduled
          status
          collections
        }
        userId
      }
    }
  }
`;

export const QUERY_SPREAD = gql`
  query SpreadById($id: ID) {
    spreadById(_id: $id) {
      _id
      monday
      weeklyCollections {
        _id
        title
        userId
        plannerItems {
          _id
          title
          body
          scheduled
          status
          collections
        }
      }
      userId
    }
  }
`;

export const USER_SPREADS = gql`
  query UserSpreads {
    userSpreads {
      _id
      monday
    }
  }
`;
