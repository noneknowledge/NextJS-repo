'use client'

import { FormEvent, ReactEventHandler, useRef } from "react"
import { text } from "stream/consumers"

const GameForm = ({triggerPost}:any)=>{
    
    const imgDiv = useRef<HTMLDivElement>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(formData.getAll("images"))
        triggerPost(formData)        
    }

    const addMoreImg = (e:React.MouseEvent) =>{
        console.log(e)
        var input = document.createElement("input")
        input.type = "text"
        input.name = "images"
        input.className = "my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

        imgDiv.current?.appendChild(input)
    }
    

    return(<>
    

<form onSubmit={handleSubmit}  className="max-w-lg p-5 mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
  <div className="mb-5">
    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Game title</label>
    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="game title" required />
  </div>
  <div className="mb-5" ref={imgDiv}>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
    <input name="images" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="mb-5">
  <button onClick={addMoreImg} type="button" className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add more</button>
  </div>
  <div className="mb-5">
    <label htmlFor="descriptioin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
    <input name="description" type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Add game
    </span>
    </button>
</form>

    </>)
}

export default GameForm