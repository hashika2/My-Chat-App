const initialesState={
    data:null,
    isAuthenticated:false
}

export default function(state=initialesState, action){
    switch(action.type){
        case 'ROOMED':
            return{
                ...state,
                data:action.payload,
                isAuthenticated:true
            }
        default:
            return state;
    }
}
