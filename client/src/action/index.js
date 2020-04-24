export const roommed=({name,room}) =>async dispatch=> {
    const res={name,room}
    console.log("test")
    dispatch({
        type:'ROOMED',
        payload:res.data
    })
}