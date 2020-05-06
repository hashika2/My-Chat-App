import React, { useState, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import {roommed} from '../../action/index';
import {connect} from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';

import './Join.css';
import Axios from 'axios';

const SignIn=({roommed,isAuthenticated,location}) =>{
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [selectedImage,setImage] = useState('');
  const students='Students';
  const officers='Officers';
  const clients ='Clients';
  const developers ='Developers';

  //get email from the link
  const { email } = queryString.parse(location.search);

  const onSubmit=(e)=>{
    e.preventDefault();
    roommed({name,room})
  }
  if(isAuthenticated){
    return <Redirect to={`/chat?name=${name}&room=${room}`}/>
  }
  const state={
    selectedFile:null
  }
  const onChangeHandler = event =>{
   //setImage(event.target.files[0])
   state.selectedFile = event.target.files[0]
  }
  const fielUploadHandler=()=>{
    // const fd= new FormData();
    // fd.append('image',selectedImage,selectedImage.image);
    // axios.post('',fd).then(res=>{
    //   console.log(res)
    // })
    
  }

  return (
    <Fragment>
   
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
      <h1 className="heading">Rooms</h1>
      <Link  to={`/chat?name=${email}&room=${students}`}>
          <button className={'button mt-20'} type="submit">Students</button>
      </Link>
      <Link  to={`/chat?name=${email}&room=${officers}`}>
          <button className={'button mt-20'} type="submit">Officers</button>
      </Link>
      <Link  to={`/chat?name=${email}&room=${clients}`}>
          <button className={'button mt-20'} type="submit">Clients</button>
      </Link>
      <Link  to={`/chat?name=${email}&room=${developers}`}>
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
          <input style={{display:'none'}} type="file" onChange={onChangeHandler} ref={fileInput => fileInput = fileInput}/>
          <button onClick={(fileInput)=>{fileInput.click()}}>Pick Image</button>
          <button onClick={fielUploadHandler}>Upload</button>
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