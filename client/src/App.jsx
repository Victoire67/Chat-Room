import { useEffect, useState } from "react" // 
import { io } from "socket.io-client"
const socket = io.connect("http://localhost:3001") // this is the backend url !

function App() {

  const [message, setMessage] = useState("") // message is what we send .
  const [messageReceived, setMessageReceived] = useState("") // this is what we received
  const sendMessage = () => {
    socket.emit("send_message", { message })
    console.log("Message sent")
  }
  useEffect(() => {
    socket.on("receive_message", data => {
      setMessageReceived(data.message)
      // If the socket changes , something is sent . set the received message to be the message property of 
    })
  }, [socket])
  return (
    <>
      <div className="p-8 m-auto flex items-center place-content-center gap-4">
        <input type="text" placeholder="message..." className="border rounded-sm p-2" onChange={(e) => setMessage(e.target.value)} />
        <button className="bg-blue-500 p-2 rounded-sm text-white" onClick={sendMessage}>Send message</button>
      </div>
      <h1 className="text-center">      {messageReceived}</h1></>
  )
}

export default App
