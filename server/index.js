const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const chatUser = require('./chatUser');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const assert = require('assert');

const mongoose = require('mongoose');
const router = require('./router');
const { User, validate} = require('./User');
// const database = require('./dbConnection');
// database.db();

const url ="mongodb+srv://hashika:hashika@cluster0-qollh.mongodb.net/test?retryWrites=true&w=majority";

//create different model
const {students,chats,officers,clients,developers} = require('./rooms/rooms');
// const mongo = require('mongodb').MongoClient;

//   console.log("connected db")
  

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



  //get data from db and send to font realtime
  if(room =="Students"){   
    students.find((err,data)=>{
      console.log(data)
      return io.emit("output message",data);      
    })
  }
  else if(room =="Officers"){
    officers.find((err,data) => {
      return io.emit("output message",data);
    })
  }
  else if(room =="Clients"){      
    clients.find((err,data) =>{
      return io.emit("output message",data);
    })
  }
  else if(room =="Developers"){
    developers.find((err,data) =>{
      return io.emit("output message",data);
    })
  }
  else if(room =="Private"){
    User.find((err,data) =>{
      console.log(data);   
      return io.emit("output data",data);
    })
  }
  else {
    chats.find((err,data) =>{
      console.log(data)
      return io.emit("output message",data);
    })
  }
    callback();
  });


  socket.on('sendMessage', (message,room, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
    let u = null;
    //save messages to db    
    if(room == 'Officers'){
       u = new officers({
        name:user.name,
        message:message
      })
    }
    else if(room == "Students") {
      u = new students({
        name:user.name,
        message:message
      })
    }
    else if(room == "Clients") {
      u = new clients({
        name:user.name,
        message:message
      })
    }
    else if(room == "Developers") {
      u = new developers({
        name:user.name,
        message:message
      })   
    }
    else {
      u = new chats({
        name:user.name,
        message:message
      })
    }
    u.save((error,doc) => {    
      console.log(doc.message);
      if(error) return res.json({success:false});

      chats.find({"_id":doc.id}).populate("sender").exec((err,doc) =>{
        //console.log(doc)
        //return io.emit("output message",doc); 
      })  
         
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
