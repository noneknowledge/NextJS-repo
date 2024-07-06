
import GameForm from "@/Components/addGameForm"
import { redirect } from "next/navigation"

const AddGame = async()=>{

    
    const res = await fetch("http://localhost:3000/api/category")
    const allCategories = await res.json()

    if (res.status !== 200){
        redirect("/not-found")
    }
    const postGame = async (formData:FormData) =>{
        'use server'
        const response = await fetch('http://localhost:3000/api/game', {
            method: 'POST',
            body: formData,
            })

        const data = await response.json()
        if(response.status !== 201)
            {
                console.log("error: " + data.message)
            }
        
    }

return (<>
    
<GameForm handleForm={postGame} categories={allCategories}></GameForm>

</>)
}

export default AddGame