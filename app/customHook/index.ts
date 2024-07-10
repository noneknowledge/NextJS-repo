import AuthContext from "@/context/AuthContext"
import { useContext, useEffect, useState } from "react"
import useSWR from "swr"

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

export const useComment = (gameId:string) => {
    const fetcher = (url:string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/comment/${gameId}`, fetcher,{
        revalidateOnFocus: false,
        revalidateIfStale: false
    })
    
    return {
        comments: data,
        isLoading,
        isError: error
      }
}