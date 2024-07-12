'use client'

import { ReactNode, useReducer } from "react"
import GlobalContext from "./GlobalContext"
import reducer, { initialState } from "./reducer"


const GlobalProvider = ({children}:{children: React.ReactNode}) =>{
    
    const [state,dispatch] = useReducer(reducer,initialState)
  
    
    return(
        <GlobalContext.Provider value={[state,dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider