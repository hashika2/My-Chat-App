import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";



import './Chat.css';

let socket;

const Chat = ({ location,registerRoom ,isAuthenticated}) => {
  
  //const ENDPOINT = 'https://sleepy-castle-27435.herokuapp.com/';
  const ENDPOINT='localhost:5000'
  useEffect(() => { 
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

  }, [ENDPOINT, location.search]);
  
  

  
  return (
    <div className="outerContainer">
      
    </div>
  );
}


export default Chat;
