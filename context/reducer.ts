import { useReducer } from "react"

export const enum REDUCER_ACTION_TYPE {
    SET_LOGIN,
    SET_NAME,
    SET_LOGOUT

}

type REDUCER_ACTION = {
    type: REDUCER_ACTION_TYPE
    payload:string
}



export const initialState = {
    token: "",
    name: ""
    }


const reducer = (state: typeof initialState,action: REDUCER_ACTION): typeof initialState =>{
    switch(action.type){
        case(REDUCER_ACTION_TYPE.SET_LOGIN):
            return {...state,token: action.payload}
        case(REDUCER_ACTION_TYPE.SET_NAME):
            return {...state,name: action.payload}
        case(REDUCER_ACTION_TYPE.SET_LOGOUT):
            return {...initialState}
        default:
            return state
        //.....
    }
}



export default reducer