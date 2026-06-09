const express = require("express") // Creates an express app
const app = express(); // Create an instance of app .
const cors = require('cors') // require the cors middleware
const http = require("http"); // requires http 

const { Server } = require("socket.io") // on this server we are going to specify the port used by the front-end
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] } // this is the front-end url
})

io.on("connection", (socket) => { // Listens to the connection event of the Server 
    console.log("User connected " + socket.id)
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message" , data) 
    })
})


server.listen(3001, () => {// the backend ! url
    console.log("server is running !")
})