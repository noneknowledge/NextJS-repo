import CommentSection from "@/Components/commentSection"
import GameDetail from "@/Components/detailGame"
import { redirect } from 'next/navigation'
import { Metadata } from "next"


const metadata: Metadata = {
    title: 'Game ',
    description: "Game description",
  }

const DetailPage = async({params}:any) =>{
    const {id} = params
    console.log("id game: " + id)
    const response = await fetch(`http://localhost:3000/api/game/${id}`)
    if (response.status !== 200){
        return redirect("/not-found")
    }

    const data = await response.json()
    const game = data.message

    metadata.title = 'Game '+ game.title
    metadata.description = game.description
    
   
   
    return(
        <>  <div className="grid place-items-center">
           
            <GameDetail categories={game.categories} description={game.description} images={game.images} title={game.title} id={game._id}></GameDetail>
            </div>
            <h1>Tach phan doc localstorage ra component nho va doc sau khi load xong</h1>
            <CommentSection gameId={game._id}/>
        </>
    )
}

export {metadata}

export default DetailPage