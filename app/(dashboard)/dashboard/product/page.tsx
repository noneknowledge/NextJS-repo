
import ProductTable from "@/Components/productTable"
import { redirect } from "next/navigation"

const ProductDashBoard = async() =>{
    
    const response = await fetch("http://localhost:3000/api/game",{ next: { revalidate: 3600 } })
    if (response.status !== 200){
        redirect("/not-found")
    }

    const games = await response.json()
    console.log(games.length)
    return(<>
        <ProductTable games={games} />
 
        {/* <ProductTable /> */}
        </>)
        
}

export default ProductDashBoard