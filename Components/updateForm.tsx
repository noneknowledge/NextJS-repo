'use client'


import { STATES } from "mongoose"
import { FormEvent, Reducer, useReducer, useRef, useState } from "react"


interface IProps{
    title: string ,
    description: string,
    id: string,
    images: string[],
    handleForm: (formData:FormData) => void
}

const enum REDUCER_ACTION_TYPE {
    SET_TITLE,
    SET_DESCRIPTION,
    SET_IMAGES,

}

type REDUCER_ACTION = {
    type: REDUCER_ACTION_TYPE
    payload:string
    index?: number
}

const UpdateForm = (props:IProps) =>{
    const {title} = props
    const {description} = props
    const {images} = props
    const {id} = props
    const {handleForm} = props
    const imgDiv = useRef<HTMLDivElement>(null)     

    //useReducer hook

    const [useStateItem,setUseState] = useState(images)

    const initialFormState = {
        title: title,
        description: description,
        images: images,
        }
    
    const reducer = (state :typeof initialFormState,action:REDUCER_ACTION): typeof initialFormState=>{
        switch(action.type){
            case REDUCER_ACTION_TYPE.SET_TITLE:
                return {...state,title: action.payload}
            case REDUCER_ACTION_TYPE.SET_DESCRIPTION:
                return {...state,description: action.payload}
            case REDUCER_ACTION_TYPE.SET_IMAGES:
                console.log("index: " + action.index)
                if(action.index !== undefined)
                    {
                        let newState = {...state}
                        newState.images[action.index] = action.payload

                    state.images[action.index] = action.payload
                    return newState
                    }
                else{
                    throw new Error("Something went wrong! ")
                }
                
                
            default:
                throw new Error("Invalid action")
        }
    }

    const [state,dispatch] = useReducer(reducer,initialFormState)
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(formData.getAll("images"))
        handleForm(formData)        
    }
    const addMoreImg = (e:React.MouseEvent) =>{
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
                <input type="text" name="title" id="title" value={state.title} onChange={(e)=>{
                    dispatch({type:REDUCER_ACTION_TYPE.SET_TITLE,payload:e.target.value})
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="game title" required />
            </div>
            <div className="mb-5" ref={imgDiv}>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</p>
                {state.images.map((image,index)=>{
                    return <input key={index} onChange={e=>{dispatch({type:REDUCER_ACTION_TYPE.SET_IMAGES,payload:e.target.value,index:index})}} name="images"  required  value={image} type="text" className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                })}
               
             
                
            </div>
            <div className="mb-5">
            <button onClick={addMoreImg} type="button" className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add more</button>
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input name="description" value={state.description} type="text" id="description" onChange={e=>{
                    dispatch({type:REDUCER_ACTION_TYPE.SET_DESCRIPTION,payload:e.target.value})
                }}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            
            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                edit game
                </span>
                </button>
</form>
        </>)
    }
   


export default UpdateForm