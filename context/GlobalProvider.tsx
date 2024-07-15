'use client'

import { useReducer } from "react"
import GlobalContext from "./GlobalContext"
import reducer, {initialState}  from "./reducer"
import { useLocalStorage } from "@/app/customHook"



const GlobalProvider = ({children}:{children: React.ReactNode}) =>{
    // const [user,setuser] = useLocalStorage("user")
    // const [noti_cart,setNotiCart] = useLocalStorage("cart")

    const [state,dispatch] = useReducer(reducer,initialState)
    
    
    return(
        <GlobalContext.Provider value={[state,dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider