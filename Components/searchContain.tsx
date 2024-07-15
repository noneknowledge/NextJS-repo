'use client'

import Link from "next/link"
import Image from "next/image"

interface IProp {
    games:any[]
    users:any[]
}

const SearchContainer = (props:IProp) =>{
    const {games} = props
    const {users} = props

    return(<div className="grid place-items-center">
         <div className="container w-4/5 my-5">
         <h1>User</h1>
    <div className="grid grid-cols-4 gap-10 my-10">
        <UserSection />
        <UserSection />
        <UserSection />
        
    </div>
         <h1>Game</h1>
    <div className="grid grid-cols-4 gap-10 my-10">
        {games.map((game:any,index:number)=>{
            return (
            <div key={index}>
                <GameSection game={game}  />
                </div>
        )
        })}
    </div>
   
    </div>
    </div>)
}


const GameSection = (props:any) =>{

    const {game} = props 
    console.log(game)
    const {title} = game
    const {description} = game
    const {images} = game
    const {_id} = game
    const {price} = game

  

    return(<div>
       
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={"/game/"+_id}>
            
                <Image priority className="rounded-t-lg" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} src={images[0]}   alt={title} />
            </Link>
            <div className="p-5">
                <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </Link>
                <p className="mb-3 truncate font-normal text-gray-700 dark:text-gray-400">{description}</p>
                <div className="flex justify-center">
                <h1 className="px-3 rounded-lg  inline-flex items-center text-center box-decoration-slice bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white  ">${price}</h1>
                </div>
            </div>
        </div>
    </div>)

}

const UserSection = (prop:any) =>{

    return(
        

<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div className="flex mt-4 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
            <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
        </div>
    </div>
</div>

    )

}


export default SearchContainer
