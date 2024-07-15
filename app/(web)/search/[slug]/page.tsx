
'use server '

import { redirect } from "next/navigation"
import SearchContainer from "@/Components/searchContain"

const SearchPage = async ({params:{slug}}:any) => {
    console.log("slug")
    console.log(slug)
    console.log("slug")

    const res = await fetch(`http://localhost:3000/api/search/${slug}`)
    const message = await res.json()
    if(message.length === 0 || res.status !== 200){
      redirect('/not-found')
    }
    console.log(message)


    return(<>
        <SearchContainer games={message.games} users={message.users}  />
    </>)
}


export default SearchPage