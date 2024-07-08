import game from "@/models/game"
import { NextResponse } from "next/server"
import ConnectDB from "@/libs/db_config"
import { NextRequest } from "next/server"
import mongoose from "mongoose"



export async function GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const res = await game.find({})
    return NextResponse.json(res)
}

export async function POST(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    console.log("post 2")
    const formData = await req.formData();
    const title = formData.get("title")
    const price = formData.get("price")
    const description = formData.get("description")
    const rawImages = formData.getAll("images") as string[]
   
    const images = rawImages.filter((image:string)=>image.length >0)
    await game.create({
        title:title,
        description: description,
        images: images,
        price: price
    })
    console.log("request")
    const res = "post response " + title + description + images
    return NextResponse.json({message:res},{status:201})
}

