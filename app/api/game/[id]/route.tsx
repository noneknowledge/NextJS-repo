import { NextResponse } from "next/server"
import game from "@/models/game"

export async function GET(req:Request, {params}) {
    const id = params['id']
    console.log("params")
    console.log(params)
    try{
        const item = await game.findById(id)
        console.log(item)
       
        return NextResponse.json({message:item},{status:200})

 
    }
    catch (err){
        const mess = "Game not found."
        return NextResponse.json({message:mess},{status:404})
    }
  
  
        
    
}

export async function PUT(req:Request, {params}) {
    const id = params['id']
    console.log("params")
    console.log(params)
    const mess = "Id : " + id
    return NextResponse.json({message:mess},{status:200})
}