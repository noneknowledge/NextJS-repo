import AuthContext from "@/context/AuthContext"
import { useContext, useEffect, useState } from "react"


export const useDebounce = <T>(value:T, delay = 100) => {
    const [deboundValue, setDeboundValue] = useState(value)

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDeboundValue(value)
        },delay)

        return () => {
            console.log("clean up") 
            clearTimeout(timeout)
        }
    },[value,delay])
    return deboundValue

}

export const useAuth = () =>{
    const [state,dispatch] = useContext(AuthContext)
    return [state,dispatch]
}