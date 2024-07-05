import { useEffect, useState } from "react"


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