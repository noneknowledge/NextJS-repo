'use client'

import Image from "next/image"
import {  useState } from "react"

interface IProps{
    title: string ,
    description: String,
    id: string,
    images: string[]
}


const GameDetail =  (props:IProps)=>{
    const width = 200
    const height = 200

    const {title} = props
    const {description} = props
    const {images} = props
    const {id} = props
    
        
    const [bigImg, setBigImg] = useState(images[0])
    


    const changeImage = (index:number) =>{
        console.log(index)
        setBigImg(images[index])
   
        
    
        
    }

    return(<>
    
    <div className="grid grid-cols-2 gap-4 w-4/5">
    <article>
    <h1 className="text-center text-5xl p-3 m-3 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ">
        {title}</h1>
    
    <p className="mb-3   first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-violet-950 dark:first-letter:text-violet-700 first-letter:me-3 first-letter:float-start">
        {description}
    </p>



    </article>
    <div >
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

    <h1 className="text-5xl p-3 m-3 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ">{title}</h1>
    <div className="grid gap-4">
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

    </>)
}

export default GameDetail