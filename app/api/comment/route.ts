import { NextRequest,NextResponse } from "next/server";
import mongoose, { mongo } from "mongoose";
import comment from "@/models/comment";
import ConnectDB from "@/libs/db_config";
import { checkToken } from "@/libs/helper/verifyToken";



export async function  GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const comments = await comment.find({})
    return NextResponse.json(comments)
}

export async function POST(req:NextRequest) {
    try{
        const formData = await req.formData()
        const token = req.cookies.get("token")?.value as string
        
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        checkToken(token)
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
       
        await comment.create({
            gameId: formData.get("gameid"),
            userId: formData.get("userid"),
            comment: formData.get("textarea")
        })

        return NextResponse.json("Created",{status:201})
    }

    catch(e:any){
    
        if(e.message.includes("jwt"))
            return NextResponse.json(e.message,{status:401})
        return NextResponse.json(e.message,{status:400})
    }
    
    
}