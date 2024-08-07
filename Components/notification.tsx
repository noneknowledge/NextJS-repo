'use client'

import { useGlobalValue } from "@/app/customHook"
import { REDUCER_ACTION_TYPE } from "@/context/reducer"
import { useEffect, useState } from "react"

const NotificationBar = () =>{
    const [state,dispatch] =  useGlobalValue()
    const [isShow,setShow] = useState(state.error.length > 0)
    
    
    useEffect(()=>{
        setShow(state.error.length > 0)
        let interval = setTimeout(()=>{
           setShow(false)
        },3000)

        return ()=>{
            clearInterval(interval)
        }

    },[state])
    const dismiss = () =>{
        setShow(false)
        
    }


    return (<>
        {isShow &&    
                <div id="alert-additional-content-4" className="mx-auto w-1/2 inset-x-0 p-4 mb-4 fixed text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
        <div className="flex items-center">
            <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">This is a warning alert</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
            {state.error}
        </div>
        <div className="flex justify-center">
            
            <button onClick={dismiss}type="button" className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800" data-dismiss-target="#alert-additional-content-4" aria-label="Close">
            Dismiss
            </button>
                </div>
            </div>
        }
     

        </>)
}

export default NotificationBar