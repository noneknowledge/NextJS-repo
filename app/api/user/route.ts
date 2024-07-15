import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import mongoose from "mongoose";
import player from "@/models/player";
import { checkToken } from "@/libs/helper/verifyToken";
import comment from "@/models/comment";



export async function GET(req:NextRequest) {
    try{
        const token = req.cookies.get("token")?.value as string
        
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        const decode = checkToken(token)
        const {id} = decode
        const user = await player.findById(id).select("userName avatar email fullName").populate("wishList","images title price").populate("game")
        .populate("friends", "userName")

        return NextResponse.json(user,{status:201})
    }

    catch(e:any){
        if(e.message.includes("jwt"))
            return NextResponse.json(e.message,{status:401})
        return NextResponse.json(e.message,{status:400})
    }
    
    
}

export async function POST(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    try{
        const data = await player.find({}).select("userName")
        return NextResponse.json(data)
    }
    catch(err:any){
        return NextResponse.json(err.message)
    }
}

