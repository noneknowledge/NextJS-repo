'use client'

import { useHandleStatusCode } from "@/app/customHook"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


interface IProps{
    title: string ,
    description: String,
    id: string,
    images: string[],
    price:number
}

const GameContainer = (props:IProps) =>{
    const {title} = props
    const {description} = props
    const {images} = props
    const {id} = props
    const {price} = props

    const  [statusCode,setStatus] = useHandleStatusCode()
    const [IStatusCode,setIStatusCode] = useState<IStatusCode>(statusCode)
    
    useEffect(()=>{
        setStatus(IStatusCode)

    },[IStatusCode])

    const addToFavorite = async(id:string,gameName:string) =>{
        
        console.log("id: ")
        console.log(id)

        const res = await fetch(`http://localhost:3000/api/game/${id}`,
            {method:"PATCH"})
        const message = await res.json() 
        
        const newStatusCode:IStatusCode = {
            statusCode:res.status,
            message:message + ": " + gameName,
            count:IStatusCode.count + 1
        }
        setIStatusCode(newStatusCode)
    }

  

    return(<div>
       
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={"/game/"+id}>
                <Image priority className="rounded-t-lg" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} src={images[0]}   alt={title} />
            </Link>
            <div className="p-5">
                <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </Link>
                <p className="mb-3 truncate font-normal text-gray-700 dark:text-gray-400">{description}</p>
                <div className="flex justify-between">
                <button onClick={()=>addToFavorite(id,title)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to wish list
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
                <h1 className="px-3 rounded-lg  inline-flex items-center text-center box-decoration-slice bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white  ">${price}</h1>
                </div>
                
            </div>
        </div>
    </div>)
}


export default GameContainer