
import GameContainer from "@/Components/gameContainer"

const ListGame = async ()=>{
    const response = await fetch("http://localhost:3000/api/game")
    const data = await response.json()

    

    return(
    <div className="grid place-items-center">
    <div className="container w-4/5">
    <h1>List game</h1>
    {
        data.map((game:any,index:number) =>
        { console.log(index)
            return  <GameContainer key={game._id} description={game.description} images={game.images} title={game.title} id={game._id}></GameContainer>
    }
    )
    }
   
   </div>
    </div>)
}

export default ListGame