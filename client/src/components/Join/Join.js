import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import {roommed} from '../../action/index';
import {connect} from 'react-redux';

import './Join.css';

const SignIn=({roommed,isAuthenticated}) =>{
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const onSubmit=(e)=>{
    e.preventDefault();
    roommed({name,room})
  }
  if(isAuthenticated){
    return <Redirect to='/chat'/>
  }

  return (
    <form onSubmit={e=>onSubmit(e)} >
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
    </form>
  );
  
}
const mapStateToProps=state => ({
  isAuthenticated:state.registeredRoom.isAuthenticated
})
export default connect(mapStateToProps,{roommed})(SignIn);