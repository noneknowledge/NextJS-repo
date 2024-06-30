import game from "@/models/game"
import { NextResponse } from "next/server"
import ConnectDB from "@/libs/db_config"



export async function GET(req:Request) {
    await ConnectDB()
    const res = await game.find({})
    return NextResponse.json(res)
}

export async function POST(req:Request) {
    await ConnectDB()
    console.log("post 2")
    const formData = await req.formData();
    const title = formData.get("title")
    const description = formData.get("description")
    const rawImages = formData.getAll("images") as string[]
    console.log('filter')
    const images = rawImages.filter((image:string)=>image.length >0)
    console.log("images from server")
    console.log(images)

    // await game.create({
    //     title:title,
    //     description: description,
    //     images: images
    // })
    console.log("request")
    const res = "post response " + title + description + images
    return NextResponse.json({message:res},{status:201})
}

