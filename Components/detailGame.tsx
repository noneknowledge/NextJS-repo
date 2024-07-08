'use client'

import Image from "next/image"
import Link from "next/link"
import {  useState } from "react"


interface IProps{
    title: string ,
    description: String,
    id: string,
    images: string[]
    categories: any[]
}


const GameDetail =  (props:IProps)=>{
    const width = 200
    const height = 200

    const {title} = props
    const {description} = props
    const {images} = props
    const {id} = props
    const {categories} = props
    console.log(categories)
    
        
    const [bigImg, setBigImg] = useState(images[0])
    


    const changeImage = (index:number) =>{
        console.log(index)
        setBigImg(images[index])
   
        
    
        
    }

    return(<>
    
    <div className="grid grid-cols-2 gap-4 w-4/5 my-10">
    <article>
    <h1 className="text-center text-5xl p-3 m-3 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ">
        {title}</h1>
    
    <p className="mb-3   first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-violet-950 dark:first-letter:text-violet-700 first-letter:me-3 first-letter:float-start">
        {description}
    </p>
    
    {categories.map((item:any,index:number)=>
        <Link key={index} href={`/category/${item._id}`} className="relative my-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {item.title}
        </span>
        </Link>
    )}
    </article>
   
    <div>
    <div>
        <Image style={{width:"100%"}} width={width*5} height={height*5} className="h-auto max-w-full rounded-lg" src={bigImg} alt=""/>
    </div>
    
    <div className="overflow-x-auto grid grid-cols-4 gap-5 p-5">
        {images.map((img:string,index:number)=>
            <div key={index}>
            <Image  onClick={(e)=>changeImage(index)} width={width} height={height}  className="h-auto max-w-full rounded-lg" src={img} alt={title} />
        </div>
        )}

    </div>
</div>
    </div>
   

    </>)
}

export default GameDetail