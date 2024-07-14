

import GlobalContext from "@/context/GlobalContext"
import { REDUCER_ACTION_TYPE } from "@/context/reducer"

import { useRouter } from "next/navigation"
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

const initStatusCode:IStatusCode = {
    statusCode:1,
    message:"1",
    count:0
}

export const useHandleStatusCode = ()=>{
    const [state,dispatch] = useGlobalValue()
    const router = useRouter()
    const [statusCode,setStatus] = useState<IStatusCode>(initStatusCode)

    const makeNoti = (text:string) =>{
        dispatch({type:REDUCER_ACTION_TYPE.SET_NOTI,payload:text})
    }
    
    useEffect(()=>{
       
        switch(statusCode.statusCode){
            case(1):
                break
            case(200):
                makeNoti(statusCode.message)
                break
            case(201):
                makeNoti(statusCode.message)
                break
            case(400):
                makeNoti(statusCode.message)
                break
            case(401):
                makeNoti(statusCode.message)
                router.push("/login")
                break
            default:
                makeNoti("Didn't handle this status code. "+ statusCode.message)
                break
        }
        
    },[statusCode])

    
    
    return [statusCode,setStatus] as const


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
     
        const stringifiedValue = JSON.stringify(value)
        localStorage.setItem(keyName, stringifiedValue)
      }, [value])
    
      return [value, setValue]

}