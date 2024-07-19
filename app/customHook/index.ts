

import GlobalContext from "@/context/GlobalContext"
import reducer, { REDUCER_ACTION_TYPE } from "@/context/reducer"

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
    const fetcher = (url:string) => fetch(url).then(res => {
        const successStatus = [200,201]
        if(successStatus.includes(res.status)){
            return res.json()
        }
        else{
            throw new Error("JWT expired")
        }
    })
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

export const useCart = () => {
    const fetcher = (url:string) => fetch(url).then(res => {
        const successStatus = [200,201]
        if(successStatus.includes(res.status)){
            return res.json()
        }
        else{
            throw new Error("JWT expired")
        }
        
    }

       )
    const { data, error, isLoading } = useSWR(`/api/cart/`, fetcher,{
        refreshInterval: 5000,  
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    })
    return {
        items: data,
        isLoading,
        isError: error
      }
}

export const useUser = (userId=null) => {
    const url:string = userId ? `/api/user/${userId}`: "/api/user" 

    const fetcher = (url:string) => fetch(url).then(res => {
        const successStatus = [200,201]
        if(successStatus.includes(res.status)){
            return res.json()
        }
        else{
            throw new Error("JWT expired")
        }
    })
    const { data, error, isLoading } = useSWR(url, fetcher,{
        refreshInterval: 5000,  
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    })
    return {
        data: data,
        isLoading,
        isError: error
      }
}





export const useHandleStatusCode = ()=>{
    const [state,dispatch] = useGlobalValue()
    const router = useRouter()
    const [statusCode,setStatus] = useState<number>(1)

    const makeNoti = (text:string) =>{
        dispatch({type:REDUCER_ACTION_TYPE.SET_ERROR,payload:text})
    }
    
    useEffect(()=>{
        switch(statusCode){
            case(1):
                break
            case(200):
                makeNoti("Ok")
                break
            case(201):
                makeNoti("Created")
                break
            case(400):
                makeNoti("Bad request")
                break
            case(401):
                makeNoti("Unauthorized/ Token Expired")
                router.push("/login")
                break
            default:
                makeNoti("Didn't handle this status code. ")
                break
        }
        
        
    },[statusCode])

    
    
    return [statusCode,setStatus] as const


}

export const useLocalCart = (localStorageKey:string) =>{
    const [user,setUser] = useLocalStorage(localStorageKey)
    const [state,dispatch] = useGlobalValue()
    const [value,setValue] = useState(user.cart)
    useEffect(()=>{
        setUser({...user,cart:value})
        dispatch({type:REDUCER_ACTION_TYPE.SET_CART,count:value})
    },[value])

    return [value,setValue]

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