'use client'

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IProp {
    games:any[]
    users:any[]
}

const SearchContainer = (props:IProp) =>{
    const {games} = props
    const {users} = props

    return(<div className="grid place-items-center">
         <div className="container w-4/5 my-5">
         <h1 className="text-center">User</h1>
    <div className="grid grid-cols-4 gap-10 my-10">
        {users.map((user:any,index:number)=>{
            return (<div key={index}>
                  <UserSection user={user} />
            </div>)
        })}
      
      
        
    </div>
         <h1 className="text-center">Game</h1>
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

    const router = useRouter()
    const {game} = props 
    const {title} = game
    const {description} = game
    const {images} = game
    const {_id} = game
    const {price} = game

   

    return(
       
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={"/game/"+_id}>
            
                <Image priority className="rounded-t-lg" width={1000} height={1000} style={{ width: '100%', height: 'auto' }} src={images[0]}   alt={title} />
            </Link>
            <div className="p-5">
                <Link href={"/game/"+_id}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </Link>
                <p className="mb-3 truncate font-normal text-gray-700 dark:text-gray-400">{description}</p>
                <div className="flex justify-center">
                <h1 className="px-3 rounded-lg  inline-flex items-center text-center box-decoration-slice bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white  ">${price}</h1>
                </div>
            </div>
        </div>)

}

const UserSection = (prop:any) =>{
    const {user} = prop
    const width = 100
    const height = 100

    const router = useRouter()

    const {_id} = user
    const {avatar} = user
    const {userName} = user
    const {fullName} = user
    
    

    const addFriend = () =>{
        console.log("add friend")
    }

    const goToProfile = () =>{
        router.push(`/profile/${_id}`)
    }

    return(
<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <div className="flex flex-col items-center pb-10">
        <Image onClick={goToProfile}  width={width} height={height} className="cursor-pointer  w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt={userName}/>
        <h5 onClick={goToProfile} className="cursor-pointer mb-1 text-xl font-medium text-gray-900 dark:text-white">{userName}</h5>
        <span onClick={goToProfile} className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">{fullName}</span>
        <div className="flex mt-4 md:mt-6">
            <button onClick={addFriend} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</button>
       
        </div>
    </div>
</div>

    )

}


export default SearchContainer
