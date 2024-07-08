'use client'
import { useAuth } from "@/app/customHook"
import { REDUCER_ACTION_TYPE } from "@/context/reducer"
import { useState } from "react"

const TestPage = () =>{


    const [input,setInput] = useState("")
    const [state,dispatch] = useAuth()
    const handleForm = (e:any) =>{
        e.preventDefault()
        dispatch({type:REDUCER_ACTION_TYPE.SET_NAME,payload:input})
        console.log("submit")
    }

    return(<>
    <form onSubmit={handleForm}>
    <input value={input } onChange={e=>setInput(e.target.value)} type='text' />
    <button type ="submit">Submit</button>
    </form>
  
        </>)
}

export default TestPage 