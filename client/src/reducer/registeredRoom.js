const initialesState={
    data:null,
    isAuthenticated:true
}

export default function(state=initialesState, action){
    switch(action.type){
        case 'ROOMED':
            return{
                ...state,
                data:action.payload,
                isAuthenticated:true
            }
        case 'USER_REGISTERED':
            return{
                ...state,
                date:action.payload,
                isAuthenticated:true
            }
        default:
            return state;
    }
}


