import axios from 'axios';

export const roommed=({name,room}) =>async dispatch=> {
    const res={
        name:name,
        room:room
    }
    console.log("test")
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