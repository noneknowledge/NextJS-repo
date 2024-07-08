'use client'

import { ReactNode, useReducer } from "react"
import AuthContext from "./AuthContext"
import reducer, { initialState } from "./reducer"


const AuthProvider = ({children}:{children: React.ReactNode}) =>{
    
    const [state,dispatch] = useReducer(reducer,initialState)
    console.log("File AuthProvider")
    console.log("this is provider ")
    console.log(state)
    
    return(
        <AuthContext.Provider value={[state,dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider