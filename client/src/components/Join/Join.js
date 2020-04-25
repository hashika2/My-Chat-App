import React, { useState, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import {roommed} from '../../action/index';
import {connect} from 'react-redux';

import './Join.css';

const SignIn=({roommed,isAuthenticated}) =>{
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const students='Students';
  const officers='Officers';
  const clients ='Clients';
  const developers ='Developers';

  const onSubmit=(e)=>{
    e.preventDefault();
    roommed({name,room})
  }
  if(isAuthenticated){
    return <Redirect to={`/chat?name=${name}&room=${room}`}/>
  }

  return (
    <Fragment>
   
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
      <h1 className="heading">Rooms</h1>
      <Link  to={`/chat?name=hashika&room=${students}`}>
          <button className={'button mt-20'} type="submit">Students</button>
      </Link>
      <Link  to={`/chat?name=hashika&room=${officers}`}>
          <button className={'button mt-20'} type="submit">Officers</button>
      </Link>
      <Link  to={`/chat?name=hashika&room=${clients}`}>
          <button className={'button mt-20'} type="submit">Clients</button>
      </Link>
      <Link  to={`/chat?name=hashika&room=${developers}`}>
          <button className={'button mt-20'} type="submit">Developers</button>
      </Link>
        
      </div>
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <form onSubmit={e=>onSubmit(e)} >
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
          </div>
          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className={'button mt-20'} type="submit">Sign In</button>
          </Link>
          <button className={'button mt-20'} type="submit">Private Message</button>
        </form>
      </div>
    </div>

    </Fragment>
  );
  
}
const mapStateToProps=state => ({
  isAuthenticated:state.registeredRoom
})
export default connect(mapStateToProps,{roommed})(SignIn);