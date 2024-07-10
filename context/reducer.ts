import { useReducer } from "react"

export const enum REDUCER_ACTION_TYPE {
    SET_LOGIN,
    SET_NAME,
    SET_LOGOUT

}

type REDUCER_ACTION = {
    type: REDUCER_ACTION_TYPE
    payload?:string
    put?: typeof initialState
}



export const initialState = {
    token: "",
    name: "",
    id: ""
    }


const reducer = (state: typeof initialState,action: REDUCER_ACTION): typeof initialState =>{
    switch(action.type){
        case(REDUCER_ACTION_TYPE.SET_LOGIN):
            if (action.put)
            return action.put
        case(REDUCER_ACTION_TYPE.SET_NAME):
            if (action.payload)
            return {...state,name: action.payload}
        case(REDUCER_ACTION_TYPE.SET_LOGOUT):
            return {...initialState}
        default:
            return state
        //.....
    }
}



export default reducer