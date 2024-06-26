import { NextResponse } from "next/server"
import game from "@/models/game"

export async function GET(req:Request, {params}:any) {
    const {id} = params
    try{
        const item = await game.findById(id)
        if (item === null)
            return NextResponse.json({message:"game not found"},{status:404})
        return NextResponse.json({message:item},{status:200})

    }
    catch (err){
        const mess = "Game not found."
        return NextResponse.json({message:mess},{status:404})
    }
}

export async function PUT(req:Request, {params}:any) {
    const {id} = params
    const formData = await req.formData();
    const title = formData.get("title")
    const description = formData.get("description")
    const images = formData.getAll("images")

    try{
        const update= {title:title,description:description, images:images}
        const item = await game.findOneAndUpdate({_id:id},update)
        console.log(item)
       
        return NextResponse.json({message:item},{status:200})

    }
    catch (err){
        const mess = "Game not found."
        return NextResponse.json({message:mess},{status:404})
    }
    
}



export async function DELETE(req:Request, {params}:any) {
    const {id} = params
    try{
        const item = await game.findOneAndDelete({_id:id})
        console.log(item)
        return NextResponse.json({message:item},{status:200})
    }
    catch (err){
        const mess = "Game not found."
        return NextResponse.json({message:mess},{status:404})
    }
}