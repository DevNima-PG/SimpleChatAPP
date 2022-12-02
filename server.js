const express = require("express");
const app = express();
app.use(express.static("./"));
const http = require("http");
const server = http.createServer(app)
const SocketIo = require("socket.io");

const io = SocketIo(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    socket.on("client-message", data => {
        io.emit("server-message", data)
    })
})

server.listen(3000, () => console.log("Running on port >> 3000"))