'use client'



import { useDebounce } from "@/app/customHook/useDebounce"
import { FormEvent, useEffect, useReducer, useRef, useState } from "react"




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




const CategorySelect = (prop:any) =>{
    const {categories} = prop
    const debouceDelay = 200 //100ms
    const {game_cate} = prop
    const [isOpen, setOpen] = useState(false)
    const [CategorySelect,setCategory] = useState(categories)
    const [searchValue,setSearchValue] = useState("")
    const [checked, setChecked] = useState(game_cate)

    const debounceSearch = useDebounce(searchValue,debouceDelay)

    const filterCate = (stringCompared:string) =>{
        console.log("filter ")
        let temp:any = []
        categories.map((cate:any) =>{
            if (cate.title.toUpperCase().trim().includes(stringCompared.trim().toUpperCase()))  
            {
                console.log(cate)
                temp.push(cate)
            }
        })
        return temp
       
    }

    const checkedFilter = (cate:any) =>{
        if(checked.includes(cate)){
            return checked.filter((item:string)=> item!== cate) 
        }
        else{
            return [...checked,cate]
        }   
    }

    useEffect(()=>{
        if(debounceSearch.length >0)
        {
            setCategory(filterCate(debounceSearch))        
        }
        else{
            setCategory(categories)
        }
    },[debounceSearch])

    return(<>
    
            <button onClick={()=> setOpen(!isOpen)} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Game categories
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>
            <div id="dropdownSearch" className={isOpen?"z-10 absolute  bg-white rounded-lg shadow w-60 dark:bg-gray-700":"z-10 absolute  bg-white rounded-lg shadow w-60 dark:bg-gray-700 invisible"}>
            <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                </div>
                <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search category"/>
            </div>
            </div>
            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            {CategorySelect.map((cate:any,index:number)=>{

                return <li key={cate.title}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input checked={checked.includes(cate._id)} name="cateSelect" onChange={()=>setChecked(checkedFilter(cate._id))} type="checkbox" id={`checkbox-${index}`} value={cate._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label htmlFor={`checkbox-${index}`}   className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{cate.title}</label>
                </div>
                </li>
            })}
            
            </ul>
           
        </div>
            
    </>)

}

const UpdateForm = (props:any) =>{

    

    const {handleForm} = props
    const imgDiv = useRef<HTMLDivElement>(null)     
    const {game_cate} = props
    const {categories} = props
    console.log("game cate main: ")
    console.log(game_cate)


    //useReducer hook
    const initialFormState = {
        title: props.title,
        description: props.description,
        images: props.images,
        price: props.price,
        game_cate: props.game_cate
        }
    
    const reducer = (state :typeof initialFormState,action:REDUCER_ACTION): typeof initialFormState=>{
        switch(action.type){
            case REDUCER_ACTION_TYPE.SET_TITLE:
                return {...state,title: action.payload}
            case REDUCER_ACTION_TYPE.SET_DESCRIPTION:
                return {...state,description: action.payload}
            case REDUCER_ACTION_TYPE.SET_IMAGES:
               
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
    //end useReducer 


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
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
            <div className="mb-5 grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Game title</label>
                <input type="text" name="title" id="title" value={state.title} onChange={(e)=>{
                    dispatch({type:REDUCER_ACTION_TYPE.SET_TITLE,payload:e.target.value})
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="game title" required />
               
                </div>
                <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input  name="price" value={state.price} type="number" min={0} id="price" onChange={e=>{
                    dispatch({type:REDUCER_ACTION_TYPE.SET_DESCRIPTION,payload:e.target.value})
                }}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
         
                </div>
               
                
            </div>
            <div className="mb-5 grid grid-cols-2 gap-5">
            <button onClick={addMoreImg} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add more image link</button>
            <div>
                <CategorySelect game_cate={game_cate} categories = {categories} />
            </div>
           


            </div>
           
            <div className="mb-5" ref={imgDiv}>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</p>
                {state.images.map((image:any,index:number)=>{
                    return <input key={index} onChange={e=>{dispatch({type:REDUCER_ACTION_TYPE.SET_IMAGES,payload:e.target.value,index:index})}} name="images"  required  value={image} type="text" className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                })}
                
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