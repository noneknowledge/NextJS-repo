
import GameContainer from "@/Components/gameContainer"
import { redirect } from "next/navigation"
import CategoriesPage from "../category/categoriesSection"
import { useAuth } from "@/app/customHook"

const ListGame = async ()=>{
    const response = await fetch("http://localhost:3000/api/game",{ next: { revalidate: 0 } })
    const data = await response.json()
   
    if (response.status !== 200){
        redirect("/not-found")
    }

    return(
        <div className="grid place-items-center">
        <div className="container w-4/5 my-5">
        <CategoriesPage/>
        <div className="grid grid-cols-4 gap-10 my-10">
        {
            data.map((game:any,index:number) =>
            { 
                return  <GameContainer key={game._id} description={game.description} images={game.images} title={game.title} id={game._id}></GameContainer>
        }
        )
        }
        </div>
    
    </div>
        </div>)
}

export default ListGame