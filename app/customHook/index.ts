

import GlobalContext from "@/context/GlobalContext"
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

export const useGlobalValue = () =>{
    const [state,dispatch] = useContext(GlobalContext)
    return [state,dispatch]
}

export const useComment = (gameId:string) => {
    const fetcher = (url:string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/comment/${gameId}`, fetcher,{
        refreshInterval: 5000,  
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    })
    return {
        comments: data,
        isLoading,
        isError: error
      }
}

export const useLocalStorage = (keyName:string) =>{
        
      const getStorageItem = (key:string) =>{
            'use client'
            const storedValue = localStorage.getItem(key)
            if(storedValue)
            {
                try{
                    const parsedValue = JSON.parse(storedValue)
                    return parsedValue
                }
                catch(e){
                    return storedValue
                }
            }
            return null
            
      }
      
      const [value, setValue] = useState(getStorageItem(keyName))
      
      

      useEffect(() => {
        console.log("change value log in customhook")
        const stringifiedValue = JSON.stringify(value)
        localStorage.setItem(keyName, stringifiedValue)
      }, [value])
    
      return [value, setValue]

}