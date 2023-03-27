


export const QUERY_USER = gql`
{
    query User {
    user {
      _id
      email
      password
      spreads {
        _id
        dates
        gridItems {
          body
          _id
          h
          i
          title
          w
          x
          y
        }
        plannerItems
      }
      username
    }
  }
}
