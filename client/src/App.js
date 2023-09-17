//Imports
import "./App.css";
//Importing library that allows us to connect to socket.io
//io is a variable that is going to be used to establish our connection
const io = require("socket.io-client");
//End of Imports
//Connecting our frontend to our backend
const socket = io.connect("http://localhost:3001");
function App() {
  return <div className="App"></div>;
}
export default App;
