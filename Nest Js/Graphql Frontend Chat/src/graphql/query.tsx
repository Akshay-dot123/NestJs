import { gql } from "@apollo/client";

export const FIND_ALL_MESSAGES = gql`
query FindAllMessages($room_name: String!,$username:String!) {
  findAllMessages(room_name: $room_name,username:$username) {
    id
    message
    createdAt
    updatedAt
    isDeleted
    user {
      id
      username
    }
    room {
      id
      room_name
    }
  }
}
`;