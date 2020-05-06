const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const chatUser = require('./chatUser');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const mongoose =require('mongoose');
const router = require('./router');
const database = require('./dbConnection');
//database.db();

let chatuser=mongoose.model('chats',{
  name:String,
  message:String
})
const mongo = require('mongodb').MongoClient;
mongo.connect("mongodb://localhost/db",function(err,db){
  if(err){
    throw err
  }
  console.log("connected db")
  

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {  

 
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
    //save messages to db
    const u= new chatuser({
      name:user.name,
      message:message
    })
    u.save();
    chatuser.find({message},(err,dbData)=>{
      
      console.log(dbData)
    });

  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

app.use('/api/user',router);

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
})