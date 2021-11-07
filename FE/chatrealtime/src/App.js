import 'react-bootstrap'
import './App.css'
import Lobby from './components/Lobby'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState } from 'react'

const App = () => {
  const [connection, setConnection] = useState();

  const joinRoom = async(user, room) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44315/chat")
      .configureLogging(LogLevel.Infomation)
      .build();


      connection.on("ReceiveMessage", (user, message) => {
        console.log('message received: ', message)
      })

      await connection.start();
      await connection.invoke("JionRoom", {user, room})
      setConnection(connection)
    } catch(e){
      console.log(e);
    }
  }
  return <div className="app">
    <h2>My Chat</h2>
    <hr className="line"/>
    <Lobby joinRoom={joinRoom}/>
  </div>
}

export default App
