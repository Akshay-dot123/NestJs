import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageSent($room_name: String!) {
    messageSent(room_name: $room_name) {
      id
      message
      createdAt
      updatedAt
      isDeleted
      user {
        username
      }
    }
  }
`;

export const MESSAGE_UPDATED_SUBSCRIPTION = gql`
  subscription OnMessageUpdated($room_name: String!) {
    messageUpdated(room_name: $room_name) {
      id
      message
      createdAt
      updatedAt
      isDeleted
      user {
        username
      }
    }
  }
`;


export const MESSAGE_DELETED_SUBSCRIPTION = gql`
  subscription OnMessageDeleted($room_name: String!) {
    messageDeleted(room_name: $room_name) {
      id
      message
      createdAt
      updatedAt
      isDeleted
      user {
        username
      }
    }
  }
`;