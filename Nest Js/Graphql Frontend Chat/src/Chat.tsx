import { useMutation, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  DELETE_MESSAGE,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
} from "./graphql/mutation";
import { DeleteMessageModal } from "./Modal/Deletemessage";
import {
  MESSAGE_DELETED_SUBSCRIPTION,
  MESSAGE_SUBSCRIPTION,
  MESSAGE_UPDATED_SUBSCRIPTION,
} from "./graphql/subscription";

const Chat = ({ data, username, room_name, oldMessages }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setmessageList] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { room_name },
    onSubscriptionData: ({ subscriptionData }) => {
      const newMessage = subscriptionData.data?.messageSent;
      if (newMessage && newMessage.user.username !== username) {
        setmessageList((list) => [...list, newMessage]);
      }
    },
  });

  useSubscription(MESSAGE_UPDATED_SUBSCRIPTION, {
    variables: { room_name },
    onSubscriptionData: ({ subscriptionData }) => {
      const updatedMsg = subscriptionData.data?.messageUpdated;
      if (updatedMsg) {
        setmessageList((list) =>
          list.map((msg) =>
            msg.id === updatedMsg.id ? { ...msg, ...updatedMsg } : msg
          )
        );
      }
    },
  });

  useSubscription(MESSAGE_DELETED_SUBSCRIPTION, {
    variables: { room_name },
    onSubscriptionData: ({ subscriptionData }) => {
      const deletedMsg = subscriptionData.data?.messageDeleted;
      if (deletedMsg) {
        setmessageList((list) =>
          list.map((msg) => (msg.id === deletedMsg.id ? deletedMsg : msg))
        );
      }
    },
  });

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [deleteMessageMutation] = useMutation(DELETE_MESSAGE);
  const [updateMessageMutation] = useMutation(UPDATE_MESSAGE);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room_name,
        username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messageData);
      setCurrentMessage("");

      if (editingMessageId) {
        try {
          const originalMessage = messageList.find(
            (msg) => msg.id === editingMessageId
          );
          console.log("originalMessage=============>", originalMessage.message);
          console.log("currentMessage=============>", currentMessage);
          if (originalMessage.message.trim() == currentMessage.trim()) {
            setEditingMessageId(null);
            return;
          }
          const res = await updateMessageMutation({
            variables: {
              updateMessageInput: {
                id: editingMessageId,
                message: currentMessage,
              },
            },
          });
          const updatedMessage = res.data?.updateMessage;
          console.log(updatedMessage);
          setmessageList((list) =>
            list.map((msg) =>
              msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg
            )
          );
          setEditingMessageId(null);
          setCurrentMessage("");
        } catch (err) {
          console.error("Update message error:", err);
        }
      } else {
        try {
          const res = await sendMessageMutation({
            variables: {
              sendMessageInput: {
                room_name,
                username,
                message: currentMessage,
              },
            },
          });
          const newMessage = res.data?.sendMessage;
          setmessageList((list) => [...list, newMessage]);
          setCurrentMessage("");
        } catch (err) {
          console.error("GraphQL mutation error:", err);
        }
      }
    }
  };
  useEffect(() => {
    setmessageList(oldMessages);
  }, [oldMessages]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            if (messageContent.isDeleted) return null;
            const isYou = username === messageContent.user.username;
            console.log(username);
            console.log(messageContent.user);
            const isEdited =
              messageContent.updatedAt !== messageContent.createdAt;

            return (
              <div
                className="message"
                id={isYou ? "you" : "other"}
                key={messageContent.id}
              >
                {isYou && (
                  <>
                    <span
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      onClick={() => {
                        setCurrentMessage(messageContent.message);
                        setEditingMessageId(messageContent.id);
                      }}
                    >
                      ✏️
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEditingMessageId(null);
                        setCurrentMessage("");
                        setMessageToDelete(messageContent);
                        setShowDeleteModal(true);
                      }}
                    >
                      🗑️
                    </span>
                  </>
                )}
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    {isEdited && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "gray",
                          marginRight: "10px",
                          fontStyle: "italic",
                        }}
                      >
                        Edited
                      </span>
                    )}
                    <p id="time">
                      {new Date(messageContent.createdAt).toLocaleTimeString()}
                    </p>
                    <p id="author">{messageContent.user.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder={
            editingMessageId ? "Edit your message..." : "Type your message..."
          }
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            } else if (e.key === "Escape") {
              setEditingMessageId(null);
              setCurrentMessage("");
            }
          }}
        />
        <button onClick={sendMessage}>{editingMessageId ? "✅" : "➤"}</button>
        {showDeleteModal && (
          <DeleteMessageModal
            onClose={() => {
              setShowDeleteModal(false);
              setMessageToDelete(null);
            }}
            onDeleteForEveryone={async () => {
              const res = await deleteMessageMutation({
                variables: {
                  deleteMessageInput: {
                    id: messageToDelete.id, // ✅ This must match the GraphQL schema type
                  },
                },
              });
              const updatedMessage = res.data?.deleteMessage;
              console.log(updatedMessage);
              setmessageList((list) =>
                list.map((msg) =>
                  msg.id === updatedMessage.id ? updatedMessage : msg
                )
              );
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
