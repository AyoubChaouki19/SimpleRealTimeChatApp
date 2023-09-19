//Importing libraries
const express = require("express");
//calling expres() returns a new Express application instance , this application is like a blank canvas where you define routes,middlewares and other settings to create a web server
const app = express();
//require http library to create a server
const http = require("http");
// cors library to handle cors bugs
const cors = require("cors");
//importing from socket.io library a class called server
const { Server } = require("socket.io");
//The library socekt.io has many benifits as I'm learning the advantages that i noticed are: Sending data to the backend easily without and post request or using axios which pretty convinient
//End of Importing Libraries
//use cors on our app
app.use(cors());
const server = http.createServer(app);
//creating new instance of the class Server in a variable called io and pass the variable server to it and setting up cors for it
const io = new Server(server, {
  cors: {
    //origin which server is gonna be making requests to our socket.io server
    origin: "http://localhost:3000",
    //kind of requests to our socket.io server like CRUD
    methods: ["GET", "POST"],
  },
});
//socketio is based of events
//Now we can use our io variable to detect if someone connected to our socketio server
io.on("connection", (socket) => {
  //If some connects to our socket server this function runs
  console.log(`${socket.id} is connected`);
  socket.on("joinRoom", (data) => {
    //If the event "joinRoom" is emitted in the frontend this function runs
    //socket.join() is a function users based on some data in our case is the id of the room
    socket.join(data);
    console.log(`${socket.id} join the room ${data}`);
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    //closing the tab means disconnecting so if this event happens we call
    console.log(`${socket.id} is disconnected`);
  });
});
server.listen(3001, () => {
  console.log("Server is running");
});
