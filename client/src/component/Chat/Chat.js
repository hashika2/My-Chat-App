import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import InforBar from '../InForBar/InforBar'



import './Chat.css';

let socket;

const Chat = ({ location,registerRoom ,isAuthenticated}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  //const ENDPOINT = 'https://sleepy-castle-27435.herokuapp.com/';
  const ENDPOINT='localhost:5000'
  useEffect(() => { 
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

  }, [ENDPOINT, location.search]);
  
  

  
  return (
    <div className="outerContainer">
        <div className="container">
          <InforBar room={room}/>
        </div>
    </div>
  );
}


export default Chat;
