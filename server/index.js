const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const {saveMessage} =require('./dbConnection');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(router);

io.on('connect', (socket) =>{
  

  socket.on('disconnect', () => {
   
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));