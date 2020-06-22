const initialState ={
    data:null,
    isGetData:false
}

export default function(state=initialState,action){
    switch(action.type){
        case "GET_ROOM_DATA":
            return {
                ...state,
                data:action.payload,
                isGetDate:true
            }
            default:
                return state;
    }

}