import GameContainer from "@/Components/gameContainer"
import { redirect } from "next/navigation"



const CategoriesGame = async({params}:any) =>{
    const {cateId}  = params

    const res = await fetch(`http://localhost:3000/api/category/${cateId}`,{ next: { revalidate: 3000 } })
    if (res.status !== 200){
        redirect("/not-found")
    }
    const data = await res.json()
    const {data: {cate}} = data
    const {data: {games}} = data
  


    return(
        <div className="grid place-items-center">
        <div className="container w-4/5 my-5">
        
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {cate.title}
            </span></h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            {cate.description}</p>

        <div className="grid grid-cols-4 gap-10 my-10">
        
        {games &&
            games.map((game:any,index:number) =>
            { 
                return  <GameContainer key={game._id} description={game.description} images={game.images} title={game.title} id={game._id}></GameContainer>
        }
        )
        }
        </div>
    
    </div>
        </div>)
}

export default CategoriesGame 