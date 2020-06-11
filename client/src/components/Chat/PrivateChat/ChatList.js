import React from 'react';

import onlineIcon from '../../../icons/onlineIcon.png';

import '../../TextContainer/TextContainer.css';
import { Link } from 'react-router-dom';

const ChatLIst = ( {users=[]} ) => (

    <div className="textContainer">
      <div>
        <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
        <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
        <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
      </div>
             { 
              (<div>
                <h1>Current Users</h1>
                <div className="activeContainer">
                  <h2>
                   { 
                   // users.filter(user =>(
                     users.map(user => (
                      <div key={user} className="activeItem">
                      <img src="data:image/png;base64,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" style={{borderRadius :"100%",width : "50px"}}/>

                     <Link type="button"  className="btn btn-success my-2 btn-block" style={{width:"150px"}}>{user}</Link>
                      
                      <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                     ))
                     
                    //))                   
                   }                   
                  </h2>
                </div>
             
              </div>
              )
            }
      </div>
    
);

export default ChatLIst;