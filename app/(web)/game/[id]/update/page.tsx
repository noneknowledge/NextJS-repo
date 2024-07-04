'use server'

import UpdateForm from "@/Components/updateForm"
import { redirect } from 'next/navigation'


const UpdateGame = async ({params}:any) => {

    const {id} = params
    console.log("id game: " + id)
    const response = await fetch(`http://localhost:3000/api/game/${id}`)
    const data = await response.json()
    const game = data.message
    console.log(game)

    const editGame = async (formData:FormData) =>{
        'use server'
        const updateRequest = await fetch(`http://localhost:3000/api/game/${id}`,
            {method:"PUT",body:formData})
            
        if(updateRequest.status === 200){
            redirect("/game")
        }
        else{
            redirect("not-found")
        }
        
       
    }


    return(<>
        <UpdateForm handleForm={editGame} key={game._id} description={game.description} images={game.images} title={game.title} id={game._id}></UpdateForm>
    </>)    


}

export default UpdateGame