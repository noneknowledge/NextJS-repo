'use client'

import Image from "next/image"
import Link from "next/link"
import { describe } from "node:test"

interface IProps{
    title: string ,
    description: String,
    id: string,
    images: string[]
}

const GameContainer = (props:IProps) =>{
    const {title} = props
    const {description} = props
    const {images} = props
    const {id} = props

    const login = ()=>{

        alert("click")
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
                <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>

    </div>)
}


export default GameContainer