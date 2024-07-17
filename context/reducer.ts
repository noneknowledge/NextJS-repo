
export const enum REDUCER_ACTION_TYPE {
    SET_LOGIN,
    SET_LOGOUT,
    SET_NOTI,
    SET_ERROR,
    SET_CART
    

}

type REDUCER_ACTION = {
    type: REDUCER_ACTION_TYPE
    payload?:string 
    count?:number
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
        case(REDUCER_ACTION_TYPE.SET_CART):
            if(action.count){
                return {...state,cartCount:action.count}
            }
        else{
            return state
        }
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