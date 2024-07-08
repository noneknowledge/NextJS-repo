import CategoriesButton from "@/Components/categoryButton"


const CategoriesPage = async () =>{
    const res = await fetch("http://localhost:3000/api/category")
    const allCategories = await res.json()
    

    return(<div>
        <CategoriesButton categories={allCategories} />
    </div>)
}


export default CategoriesPage