//This chat file covers how can we send data to our server using ReactJS and socekt.io,how can receive all the data sent to server from the server and this all that date at once after each time an effect happens to our page (useEffect)
import React from "react";
import { useState } from "react";
//Chat component receives a props object which contains three data
function Chat(props) {
  //we kind of imported our socket const to this component and now using it to emit events
  const socket = props.socket;
  //each time we send a message to our server we setMessageList.messageComment to currentMessage
  const [messageList, setMessageList] = useState([]);
  //used to setState the currentWrittenMessage
  const [currentMessage, setCurrentMessage] = useState("");
  //This function is played asynchronously
  const sendMessage = async () => {
    //If statement in case user tried to send empty message
    if (currentMessage !== "") {
      //initialzing a const to store our messageData then sending it after emitting the sendMessage event
      const messageData = {
        //chat component receives a props property
        username: props.username,
        room: props.username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        //setting messageContent to currentMessage sumitted
        messageContent: currentMessage,
      };
      //sending messageData to our backend
      await socket.emit("sendMessage", messageData);
      //updating the data in our messageList
      setMessageList((list) => [...list, messageData]);
      //setting currentMessage to empty to clear the previous written message
      setCurrentMessage("");
    }
  };
  return (
    <div>
      <p>Live Chat</p>
      <input
        placeholder="Send a message"
        type="text"
        value={currentMessage}
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      ></input>
      <button onClick={sendMessage}>&#10148;</button>
    </div>
  );
}
export default Chat;
