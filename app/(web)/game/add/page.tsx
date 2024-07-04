
import GameForm from "@/Components/addGameForm"

const AddGame = ()=>{

    const postGame = async (formData:FormData) =>{
        'use server'
        const response = await fetch('http://localhost:3000/api/game', {
            method: 'POST',
            body: formData,
            })

        const data = await response.json()
        console.log(response.status)
        console.log("server log")
        if(response.status !== 201)
            {
                console.log("error: " + data.message)
            }
        
    }

return (<>
    
<GameForm triggerPost={postGame}></GameForm>

</>)
}

export default AddGame