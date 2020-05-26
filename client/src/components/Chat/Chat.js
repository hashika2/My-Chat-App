import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import {afterPostMessage} from '../../action/postMessage';
import {connect} from 'react-redux';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location,afterPostMessage,chats }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //const ENDPOINT = 'https://sleepy-castle-27435.herokuapp.com/'
  const ENDPOINT ='localhost:5000'

  useEffect(() => {  
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
     
      socket.on("output message",doc =>{
        console.log(doc);
        afterPostMessage(doc);
        // chats.map((chat)=>{
        //   console.log(chat.message)
        // })
        //console.log(chats)
      })
      setMessages(messages => [ ...messages,message ])     
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
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
      <TextContainer users={users}/>
    </div>
  );
}
const mapStateToProps=state=>({
  chats:state.postMessage.chats
})

export default connect(mapStateToProps,{afterPostMessage})(Chat);
