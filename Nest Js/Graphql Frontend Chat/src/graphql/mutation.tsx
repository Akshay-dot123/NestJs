import { gql } from "@apollo/client";
export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput) {
      access_token
      room_name
      user {
        id
        username
      }
    }
  }
`;

// export const SEND_MESSAGE = gql`
//    mutation SendMessage($sendMessageInput: SendMessageInput!) {
//     sendMessage(sendMessageInput: $sendMessageInput)
//   }
// `;

export const SEND_MESSAGE = gql`
  mutation SendMessage($sendMessageInput: SendMessageInput!) {
    sendMessage(sendMessageInput: $sendMessageInput) {
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

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($updateMessageInput: UpdateMessageInput!) {
    updateMessage(updateMessageInput: $updateMessageInput) {
      id
      message
      updatedAt
      createdAt
      user {
        username
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($deleteMessageInput: DeleteMessageInput!) {
    deleteMessage(deleteMessageInput: $deleteMessageInput) {
      id
      message
      isDeleted
      updatedAt
      createdAt
      user {
        username
      }
    }
  }
`;