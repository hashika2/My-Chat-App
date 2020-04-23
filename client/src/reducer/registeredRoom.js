const initialesState={
    data:null,
    isRequired:false
}

export default function(state=initialesState, action){
    switch(action.type){
        case 'ROOMED':
            return{
                ...state,
                data:action.payload,
                isRequired:true
            }
        default:
            return state;
    }
}