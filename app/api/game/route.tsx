import game from "@/models/game"
import { NextResponse } from "next/server"
import ConnectDB from "@/libs/db_config"



export async function GET(req:Request) {
    await ConnectDB()
    const data = req.formData
    console.log(data)
    console.log("request")
    const res = await game.find({})
    return NextResponse.json(res)
}

export async function POST(req:Request) {
    await ConnectDB()
    console.log("post 2")
    const formData = await req.formData();
    const title = formData.get("title")
    const description = formData.get("description")
    const images = formData.get("images")
    await game.create({
        title:title,
        description: description,
        images: images
    })
    console.log("request")
    const res = "post response " + title + description + images
    return NextResponse.json({message:res},{status:201})
}

