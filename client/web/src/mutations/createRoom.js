import gql from "graphql-tag"

export const CREATE_ROOM = gql`
  mutation createRoom($data: RoomCreateInput!) {
    createRoom(data: $data) {
      id
      name
      size
      patients {
        id
        name
      }
      organisation {
        id
        name
      }
    }
  }
`
