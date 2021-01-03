import axios from 'axios';
import{ setAlert} from './alert';
import { v4 as uuidv4 } from 'uuid';

export const roommed = ({name,room}) => async dispatch=> {
    const res = {
        name:name,
        room:room
    }
    dispatch({
        type:'ROOMED',
        payload:res
    })
}

export const register=({name,email,password}) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const body = {
        name,email,password
    }
    try{
        const res = await axios.post('http://localhost:5000/api/user',body,config);

        dispatch({
            type:"USER_REGISTERED",  
            payload:res.data
        })
        alertData(res.data);
    }catch(error){
        if(error){
            console.log("error "+error)
            dispatch(setAlert(error,'danger'))
        }
        dispatch({
            type:"REGISTER_FAIL"
        })
    }
}

const alertData = (data)=>async dispatch => {
     console.log("data");
        dispatch({
            type:"ALERTMESSAGE",
            payload:data
        })
}

export const login=({email,password}) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const body = {
        email,password
    }
    try{
        const res = await axios.post('http://localhost:5000/api/user/login',body,config);   
        dispatch({
            type:"USER_LOGGED",
            payload:res.data
        })
    }catch(error){
        if(error){
            console.log("error   "+error)
            // error.map(error => { dispatch(setAlert(error,'danger'))});
            dispatch(setAlert(error,'danger'));
        }
        dispatch({
            type:"LOGIN_FAIL"
        })
    }
    
    
}
export const getRoomData = (room) => async dispatch => {
    console.log(room);
    const config = {
        headers: {  
          'Content-Type': 'application/json'
        }
    };
    const body = { room }
    const res = await axios.get("http://localhost:5000/api/user/roomData",body,config);
    dispatch({
        type:"GET_ROOM_DATA",
        payload: res.data     
    });
}

