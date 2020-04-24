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