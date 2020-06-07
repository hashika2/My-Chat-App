import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import {afterPostMessage} from '../../../action/postMessage';
import {connect} from 'react-redux';

import TextContainer from '../../TextContainer/TextContainer';
import Messages from '../../Messages/Messages';
import InfoBar from '../../InfoBar/InfoBar';
import Input from '../../Input/Input';

import './../Chat.css';
import ChatLIst from "./ChatList";

let socket;

const PrivateChat = ({ location,afterPostMessage,chats }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //const ENDPOINT = 'https://sleepy-castle-27435.herokuapp.com/'
  const ENDPOINT ='localhost:5000'

  useEffect(() => { 
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages,message ])  
         
    });
    socket.on("output data",doc => {
      console.log(doc);
      afterPostMessage(doc);
      // chats.filter((chat)=>{
      //   console.log(chat.message)
      // })
      //console.log(chats)
     for(let i=0;i<doc.length; i++) {
        console.log(doc[i].name)
        let message = {
          text:doc[i].message,
          user:doc[i].name
        };
        //setMessages(messages => [ ...messages,message ]) 
        var name = message.user;
        users.push(name);
      }
      setUsers(users); 
    })
    
    socket.on("roomData", ({ users }) => {
      console.log("HASHIKA ");
      //setUsers(users);
    });
      
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message,room, () => setMessage(''));
    }

  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
        <ChatLIst users={users}/>
    </div>
  );
}
const mapStateToProps=state=>({
  chats:state.postMessage.chats
})

export default connect(mapStateToProps,{afterPostMessage})(PrivateChat);
