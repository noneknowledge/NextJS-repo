import { stat } from "fs"
import { useReducer } from "react"

export const enum REDUCER_ACTION_TYPE {
    SET_LOGIN,
    SET_NAME,
    SET_LOGOUT,
    SET_NOTI
    

}

type REDUCER_ACTION = {
    type: REDUCER_ACTION_TYPE
    payload?:string
    put?: typeof initialState
}



export const initialState = {
    token: "",
    name: "",
    id: "",
    error: "",
    }


const reducer = (state: typeof initialState,action: REDUCER_ACTION): typeof initialState =>{
    switch(action.type){
        case(REDUCER_ACTION_TYPE.SET_LOGIN):
            if (action.put)
            return action.put
        case(REDUCER_ACTION_TYPE.SET_NAME):
            if (action.payload)
            return {...state,name: action.payload}
            return state
        case(REDUCER_ACTION_TYPE.SET_LOGOUT):
            return {...initialState}
        case(REDUCER_ACTION_TYPE.SET_NOTI):
            if (action.payload)
            return {...state,error: action.payload}
            return state
        default:
            return state
        //.....
    }
}



export default reducer