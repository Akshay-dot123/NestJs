import { useState } from "react";
import "./App.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Chat";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { LOGIN_MUTATION } from "./graphql/mutation";
import { FIND_ALL_MESSAGES } from "./graphql/query";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [
    getMessages,
    { data: messagesData, loading: messagesLoading, error: messagesError },
  ] = useLazyQuery(FIND_ALL_MESSAGES);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const joinRoom = async () => {
    if (username.length < 2) {
      toast("Enter unique username, must be at least 2 characters long");
      return;
    }
    if (password.length < 4) {
      toast("Enter valid password, must be at least 4 characters long");
      return;
    }
    if (!room) {
      toast("Enter Room No. or Id");
      return;
    }
    if (username !== "" && password !== "") {
      try {
        const response = await login({
          variables: {
            loginInput: {
              username,
              password,
              room,
            },
          },
        });
        if (response) {
          console.log("response===>", response);
          console.log(data);
          const messagesRes = await getMessages({
            variables: { room_name: room, username: username },
          });
          console.log("Fetched messages: ", messagesRes?.data?.findAllMessages);
          setShowChat(true);
        }
      } catch (error) {
        toast.error(error.message);
        console.error("Login error:", error);
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h1>Join a chat</h1>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Unique user Name"
            />
            <input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            <input
              type="text"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              placeholder="Room No."
            />
            <button onClick={joinRoom}>Join Room</button>
          </div>
        ) : (
          <Chat
            data={data}
            username={username}
            room_name={room}
            oldMessages={messagesData?.findAllMessages || []}
          />
          // <p>dsdf</p>
        )}
      </div>
    </>
  );
}

export default App;
