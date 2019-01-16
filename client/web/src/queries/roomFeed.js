import gql from "graphql-tag"

export const ROOM_FEED = gql`
  query roomFeed(
    $where: RoomWhereInput
    $orderBy: RoomOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    roomFeed(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      count
      rooms {
        id
        name
        size
        patients {
          id
          name
        }
      }
    }
  }
`
