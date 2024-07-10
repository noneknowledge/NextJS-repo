import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import comment from "@/models/comment";
import ConnectDB from "@/libs/db_config";

export async function  GET(req:NextRequest,{params: {gameid}}:any) {
  
    console.log(gameid)

    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const comments = await comment.find({gameId:gameid})

    return NextResponse.json(comments)
}