import GameDetail from "@/Components/detailGame"

const DetailPage = async({params}:any) =>{
    const {id} = params
    console.log("id game: " + id)
    const response = await fetch(`http://localhost:3000/api/game/${id}`)
    const data = await response.json()
    const game = data.message

   
   
    return(
        <>  <div className="grid place-items-center">
            <h1>Detail</h1>
            <GameDetail description={game.description} images={game.images} title={game.title} id={game._id}></GameDetail>
            </div>
        </>
    )
}

export default DetailPage