import axios from 'axios';

export const roommed=({name,room}) =>async dispatch=> {
    const res={
        name:name,
        room:room
    }
    dispatch({
        type:'ROOMED',
        payload:res
    })
}
export const register=({name,email,password})=>async dispatch=>{
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    const body={
        name,email,password
    }
    const res = await axios.post('http://localhost:5000/api/user',body,config);
    dispatch({
        type:"USER_REGISTERED",
        payload:res.data
    })
}
export const login=({email,password})=>async dispatch=>{
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    const body={
        email,password
    }
    console.log(body)
    const res = await axios.post('http://localhost:5000/api/user/login',body,config);
    dispatch({
        type:"USER_LOGGED",
        payload:res.data
    })
}
