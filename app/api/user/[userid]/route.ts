import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import player from "@/models/player";



export async function GET(req:NextRequest,{params:{userid}}:any) {
    try{
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        console.log("api")
        console.log(userid)
        console.log("api")
        const user = await player.findById(userid).select("userName avatar email fullName").populate("wishList","images title price").populate("game")
        .populate("friends", "userName")
        if(user){
            return NextResponse.json(user,{status:201})  
        }
        else{
            return NextResponse.json({message:"not-found"},{status:404})
        }   
     
    }

    catch(e:any){
        return NextResponse.json(e.message)
    }
    
    
}