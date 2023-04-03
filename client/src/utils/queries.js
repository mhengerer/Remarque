import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User {
    user {
      _id
      spreads {
        _id
        monday
      }
    }
  }
`;

export const QUERY_SPREAD = gql`
  query getSpread($id: ID) {
    spreadById(_id: $id) {
      _id
      monday
      plannerItems {
        _id
        body
        dayOfCurrentWeek
      }
      layout {
        _id
        h
        i
        maxH
        maxW
        minH
        minW
        w
        x
        y
      }
      gridItems {
        _id
        body
        i
        title
      }
      sunday
    }
  }
`;
