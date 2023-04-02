import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    query
    User {
      user {
        spreads {
          _id
          monday
        }
      }
    }
  }
`;

export const QUERY_SPREAD = gql`

`
