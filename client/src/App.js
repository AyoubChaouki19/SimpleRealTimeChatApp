//Imports
import React from "react";
import Chat from "./Chat";
import "./App.css";
import { useState } from "react";
//Importing library that allows us to connect to socket.io
//io is a variable that is going to be used to establish our connection
const io = require("socket.io-client");
//End of Imports
function App() {
  //Connecting our frontend to our backend
  const socket = io.connect("http://localhost:3001");
  //using useState("") react hook
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [seeChat, setSeecChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      //Triggering the event written in our backend and sending data to it
      socket.emit("joinRoom", room);
      // setting it to true so that user can see the chat now
      setSeecChat(true);
    }
  };
  return (
    <div className="App">
      {/* What does this -- ? --- : --- means , simply if the user entred a room show him the chat
    if he didn't enter the room yet show him the enter room and name component
     */}
      {!seeChat ? (
        <div>
          <h2>Chat</h2>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              //Each time an event happens on this input field i want to add the value of it which is in this case the text to "username" const
              setUsername(event.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="RoomID..."
            onChange={(event) => {
              //Each time an event happens on this input field i want to add the value of it which is in this case the text to "room" const
              setRoom(event.target.value);
            }}
          ></input>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat username={username} room={room} socket={socket} />
      )}
      {/* This component was imported and we send data to it*/}
    </div>
  );
}
export default App;
