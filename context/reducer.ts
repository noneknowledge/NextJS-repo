
export const enum REDUCER_ACTION_TYPE {
    SET_LOGIN,
    SET_LOGOUT,
    SET_NOTI,
    SET_ERROR
    

}

type REDUCER_ACTION = {
    type: REDUCER_ACTION_TYPE
    payload?:string
    put?: IinitialReducer
}



export const initialState:IinitialReducer ={
    error: "",
    logged:false,
    avatar: "",
    username: "",
    notiCount: 0,
    cartCount: 0,
}


const reducer = (state: IinitialReducer,action: REDUCER_ACTION): IinitialReducer =>{
    switch(action.type){
        case(REDUCER_ACTION_TYPE.SET_LOGIN):
            if (action.put)
            return action.put
        case(REDUCER_ACTION_TYPE.SET_LOGOUT):
            return {...initialState}
        case(REDUCER_ACTION_TYPE.SET_ERROR):
            if (action.payload)
            return {...state,error: action.payload}
            return state
        default:
            return state
        //.....
    }
}



export default reducer